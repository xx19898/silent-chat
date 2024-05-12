import { Socket } from 'socket.io-client'
import { setupSocketTest } from '../util'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { CreateChannelPayload } from '@/webSocketServer/eventHandlers/channels/createChannel'
import { ChannelsDAO } from '@/data-access/chatChannels'
import { afterEach } from 'node:test'
import { deleteAllRowsOnAllTables } from '../../databaseTestUtility'
import { Sequelize } from 'sequelize'
import { User } from '@/data-access/chatUsers'
import { ISendMessagePayload } from '@/webSocketServer/eventHandlers/messages/sendMessage'
import { IJoinChannelPayload } from '@/webSocketServer/eventHandlers/channels/joinChannel'

describe.sequential('testing channel socket endpoints', async () => {
    let userSocket: Socket
    let secUserSocket: Socket
    let closeSocketServer: () => void
    let channelsDAO: ChannelsDAO
    let sequelize: Sequelize
    let mockUser: User

    beforeAll(async () => {
        const { 
            closeIoServer, 
            firstUserSocket, 
            channelsDAO: theChannelsDao,
            sequelize:currSequelize,
            secondUserSocket
         } = await setupSocketTest()
        userSocket = firstUserSocket
        secUserSocket = secondUserSocket
        closeSocketServer = closeIoServer
        channelsDAO = theChannelsDao
        sequelize = currSequelize
        await deleteAllRowsOnAllTables(sequelize)
    })
    afterEach(async () => {
        await deleteAllRowsOnAllTables(sequelize)
    })
    afterAll(async () => {
        closeSocketServer()
    })
/*
    it('client can create a channel', async () => {
        const createChannelRequestPayload: CreateChannelPayload = { name: 'General Channel' }
        const response = await userSocket.emitWithAck('channels:create', createChannelRequestPayload)
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

    it('client can get a list of channels', async () => {
        const firstChannelCreationResponse = await userSocket.emitWithAck('channels:create', {name:'First Channel'})
        const secondChannelCreationResponse = await userSocket.emitWithAck('channels:create',{name:'Second Channel'})
        expect(firstChannelCreationResponse.status).toBe('OK')
        expect(secondChannelCreationResponse.status).toBe('OK')
        const response = await userSocket.emitWithAck('channels:list',{})
        console.log({response})
        expect(response.status).toBe('OK')
    })

    it('client can send message on a channel',async () => {
        const createChannelRequestPayload: CreateChannelPayload = { name: 'General Channel' }
        const channelCreationResponse = await userSocket.emitWithAck('channels:create', createChannelRequestPayload)
        
        const anonymousUserCreationResponse = await userSocket.emitWithAck('anonymous:start',{})
        const {channel:createdChannel,error:channelCreationError} = await channelsDAO.getChannelByName({name:createChannelRequestPayload.name,messagesIncluded:false,usersIncluded:false})
        expect(createdChannel).toBeDefined()
        expect(channelCreationError).toBe(undefined)
        expect(createdChannel!.name).toBe(createChannelRequestPayload.name)
        
        const {
            username,
            role,
            token
        } = anonymousUserCreationResponse.data

        const sendMessagePayload:ISendMessagePayload = {
            authToken: token,
            channelId: createdChannel!.id,
            messageContent: 'test message' 
        }
        const sentMessage = await userSocket.emitWithAck('messages:send',sendMessagePayload)
        expect(sentMessage.status).toBe('OK')
    })
    it('client can join a channel', async () => {
        const createChannelRequestPayload: CreateChannelPayload = { name: 'General Channel' }
        const channelCreationResponse = await userSocket.emitWithAck('channels:create', createChannelRequestPayload)
        
        const anonymousUserCreationResponse = await userSocket.emitWithAck('anonymous:start',{})
        const {channel:createdChannel,error:channelCreationError} = await channelsDAO.getChannelByName({name:createChannelRequestPayload.name,messagesIncluded:false,usersIncluded:false})
        expect(createdChannel).toBeDefined()
        expect(channelCreationError).toBe(undefined)
        expect(createdChannel!.name).toBe(createChannelRequestPayload.name)
        
        const {
            username,
            role,
            token
        } = anonymousUserCreationResponse.data

        const joinChannelPayload: IJoinChannelPayload = {
            authToken: anonymousUserCreationResponse.data.token,
            channelId:createdChannel!.id
        }

        const sentMessage = await userSocket.emitWithAck('channels:join',joinChannelPayload)
        expect(sentMessage.status).toBe('OK')
    })
*/
    it('client receives messages that are broadcasted on the channel',async () => {
        const createChannelRequestPayload: CreateChannelPayload = { name: 'General Channel' }
        const channelCreationResponse = await userSocket.emitWithAck('channels:create', createChannelRequestPayload)
        const anonymousUserCreationResponse = await userSocket.emitWithAck('anonymous:start',{})
        
        const {channel:createdChannel,error:channelCreationError} = await channelsDAO.getChannelByName({name:createChannelRequestPayload.name,messagesIncluded:false,usersIncluded:false})
        expect(createdChannel).toBeDefined()
        expect(channelCreationError).toBe(undefined)
        expect(createdChannel!.name).toBe(createChannelRequestPayload.name)
        
        const {
            username,
            role,
            token
        } = anonymousUserCreationResponse.data

        const joinChannelPayload: IJoinChannelPayload = {
            authToken: anonymousUserCreationResponse.data.token,
            channelId:createdChannel!.id
        }

        const joinChannelResponse = await userSocket.emitWithAck('channels:join',joinChannelPayload)
        
        expect(joinChannelResponse.status).toBe('OK')

        let message = ''
        const secUserCreationResponse = await secUserSocket.emitWithAck('anonymous:start',{})
        const {
            secUserUsername,
            secUserRole,
            token:secUserToken
        } = secUserCreationResponse.data
        console.log({secUserCreationResponse})
        
        const secondUserJoinChannelPayload: IJoinChannelPayload = {
            authToken: secUserCreationResponse.data.token,
            channelId:createdChannel!.id
        }
        const secondUserJoinChannelResponse = await secUserSocket.emitWithAck('channels:join',secondUserJoinChannelPayload)
        expect(secondUserJoinChannelResponse.status).toBe('OK')
        
        userSocket.on('new:message',(payload,callback) => {
            console.log({payload})
            message = payload.message.content
        })

        const sendMessagePayload:ISendMessagePayload = {
            authToken: secUserToken,
            channelId: createdChannel!.id,
            messageContent: 'test message' 
        }
        
        const sendMessageResponse = await secUserSocket.emitWithAck('messages:send',sendMessagePayload)
        expect(sendMessageResponse.status).toBe('OK')
        expect(message).toBe('test message')

        
    })
/*
    it('client can receive list of message from a certain channel', async () => {

    })
*/
})
