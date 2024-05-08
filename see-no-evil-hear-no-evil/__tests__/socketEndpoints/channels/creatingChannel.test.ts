import { Socket } from 'socket.io-client'
import { setupSocketTest } from '../util'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { CreateChannelPayload } from '@/webSocketServer/eventHandlers/channels/createChannel'
import { ChannelsDAO } from '@/data-access/chatChannels'

describe('creating new channel', async () => {
    let userSocket: Socket
    let closeSocketServer: () => void
    let channelsDAO: ChannelsDAO

    beforeAll(async () => {
        const { closeIoServer, firstUserSocket, channelsDAO: theChannelsDao } = await setupSocketTest()
        userSocket = firstUserSocket
        closeSocketServer = closeIoServer
        channelsDAO = theChannelsDao
    })
    afterAll(async () => {
        closeSocketServer()
    })

    it('client receives error if payload is incorrect', async () => {
        const createChannelRequestPayload: CreateChannelPayload = { name: 'General Channel' }
        const response = await userSocket.emitWithAck('channel:create', createChannelRequestPayload)
        expect(response.status).toBe('OK')

        const { getChannelByName } = channelsDAO

        const { channel, error } = await getChannelByName({
            messagesIncluded: false,
            usersIncluded: false,
            name: 'General Channel',
        })

        expect(error).toBeUndefined()
        expect(channel).toBeDefined()
    })
})
