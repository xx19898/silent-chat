import { IncomingMessage, ServerResponse, createServer } from 'node:http'
import { Server, Socket } from 'socket.io'
import next from 'next'
import { io } from 'socket.io-client'
import { Sequelize } from 'sequelize'
import { defineModels } from '@/utility/databaseInitialization'
import { UsersDAO, getUserDAO } from '@/data-access/chatUsers'
import initEventHandlers from './initEventHandlers'
import { MessagesDAO, getMessagesDAO } from '@/data-access/chatMessages'
import { ChannelsDAO, getChannelsDAO } from '@/data-access/chatChannels'
import { waitFor } from '../../__tests__/socketEndpoints/util'

export interface IConfig {
    cors: {
        origin: string[]
    }
    serverIsForDevelopment: boolean
    hostname: string
    port: number
}
 

export async function createNextApp({ serverIsForDevelopment, hostname, port }: IConfig) {
    const app = next({ dev: serverIsForDevelopment, hostname, port: port})
    await app.prepare()
    const handler = app.getRequestHandler()
    const httpServer = createServer(handler)
    
    return httpServer
}

// Wrapper for createNextApp, adds the socket.io server and defines and syncs database models
export async function createApp(
    httpServer: ReturnType<typeof createServer>, 
    config: IConfig, 
    channelsDAO: ChannelsDAO, 
    messagesDAO: MessagesDAO,
    usersDAO: UsersDAO,
    sequelize:Sequelize) {
    const ioServer = new Server(httpServer, {
        cors: { origin: '*' },
    })
    
    initEventHandlers({ 
        ioServer: ioServer, 
        usersDAO: usersDAO, 
        messagesDAO: messagesDAO, 
        channelsDAO: channelsDAO })
    
    return {
        async close() {
            ioServer.close()
        },
        async disconnectDB() {
            sequelize.close()
        },
        usersDAO,
        messagesDAO,
        channelsDAO,
    }
}
