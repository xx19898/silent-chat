import { authorize } from "@/auth/authorize";
import { ChannelsDAO } from "@/data-access/chatChannels";
import { MessagesDAO } from "@/data-access/chatMessages";
import { UsersDAO } from "@/data-access/chatUsers";
import { Socket } from "socket.io";
import { z } from "zod";

interface ISendMessage{
    socket:Socket,
    messagesDAO: MessagesDAO,
    channelsDAO: ChannelsDAO,
    usersDAO:UsersDAO
}

const sendMessagePayloadScheme = z.object({
    channelId: z.string(),
    messageContent:z.string(),
    authToken:z.string()
})

export type ISendMessagePayload = z.infer<typeof sendMessagePayloadScheme>


export function sendMessage({socket,channelsDAO,messagesDAO,usersDAO}:ISendMessage){
    return async(
        payload: ISendMessagePayload,
        callback: ({status,error}:{status:string,error: string | undefined}) => void
    ) => {
        console.log({thePayload:payload})
        

        //TODO: this breaks the app totally if it throws, deal with it!!!
        try{
            sendMessagePayloadScheme.parse(payload)
        }catch(e){
            callback({status:'Error',error:'Incorrect payload'})
        }
                
        const jwtSecret = process.env.JWT_SECRET

        if(!jwtSecret) callback({status:'Error',error:'Internal server error'})
        
        const decodedData = await authorize({callback:callback,jwtSecret:jwtSecret!,token:payload.authToken})
        
        if(!decodedData) callback({status:'Error',error:'Internal server error'})
        
        const {error,message} = await messagesDAO.createNewMessage({authorUsername:decodedData!.data.username,channelId:payload.channelId,content:payload.messageContent})
        if(error) callback({status:'Error',error:'Internal server error'})
        
        socket.to(payload.channelId).emit("new:message",{
            message:message,
            sender:decodedData?.data.username
        })
        
        callback({status:'OK',error:undefined})
    }
}