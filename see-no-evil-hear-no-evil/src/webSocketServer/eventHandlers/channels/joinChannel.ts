import { authorize } from "@/auth/authorize";
import { ChannelsDAO } from "@/data-access/chatChannels";
import { Socket } from "socket.io";
import { z } from "zod";


const joinChannelPayloadScheme = z.object({
    channelId:z.string(),
    authToken:z.string()
})

export type IJoinChannelPayload = z.infer<typeof joinChannelPayloadScheme>

function parsePayload(payload:unknown,callback: ({status,error}:ICallback) => void){
    try{
        joinChannelPayloadScheme.parse(payload)
    }catch(e){
        callback({status:'Error',error:'Incorrect payload'})
    }
}

interface IJoinChannel{
    channelsDAO: ChannelsDAO
    socket: Socket
}
interface ICallback{
    status:string,
    error: string | undefined,
}
export function joinChannel({channelsDAO,socket}:IJoinChannel){
    return async(
        payload: IJoinChannelPayload,
        callback: ({status,error}:ICallback) => void
    ) => {
        parsePayload(payload,callback)
        const jwtSecret = process.env.JWT_SECRET
        if(!jwtSecret) callback({status:'Error',error:'Internal server error'})
        const decodedUserData = await authorize({callback:callback,jwtSecret:jwtSecret!,token:payload.authToken})
        if(!decodedUserData) callback({status:'Error',error:'Internal server error'})
        socket.join(payload.channelId)
        callback({status:'OK',error:undefined})
    }
}