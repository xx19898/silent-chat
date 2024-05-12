

/*
export function getAllChannelsWithNumberOfParticipants({channelsDAO})
*/

import { ChannelsDAO } from "@/data-access/chatChannels";
import { Socket } from "socket.io";

// TODO: test the dao function for getting all the channel names with the number of participants
interface IListChannels{
    channelsDAO: ChannelsDAO
}
export function listChannels({channelsDAO}:IListChannels){
    return async (
        payload:any,
        callback:({status,data}:{
            status:string,
            data:
            {
                id:string,
                channelName:string,
                userCount:number
            }[]
            | undefined
        }) => void
    ) => {
        const {channels,error} = await channelsDAO.getChannelsWithUserCount()
        if(error) callback({status:'Error, could not get the channels info',data: undefined})
        callback({status:'OK',data:channels})
    }
}
