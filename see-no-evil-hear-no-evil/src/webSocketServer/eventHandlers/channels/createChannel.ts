//TODO: test

import { ChannelsDAO } from '@/data-access/chatChannels'
import { Socket } from 'socket.io'
import { infer, z } from 'zod'

const createChannelPayload = z.object({
    name: z.string(),
})

export type CreateChannelPayload = z.infer<typeof createChannelPayload>

interface ICreateChannel{
    socket: Socket
    channelsDAO: ChannelsDAO
}

function createChannel({ channelsDAO }: ICreateChannel) {
    return async (
        payload: z.infer<typeof createChannelPayload>,
        callback: ({ status }: { status: string }) => void
    ) => {
        const { channel, error } = await channelsDAO.createNewChannel({ name: payload.name })
        console.log({channel,error})
        if (error || !channel) callback({status: 'Error'})
        try {
            const { name: channelName } = createChannelPayload.parse(payload)
            callback({ status: 'OK' })
        } catch (e) {
            console.log({ e })
            callback({ status: 'Error' })
        }
    }
}

export default createChannel
