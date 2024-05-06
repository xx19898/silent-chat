import { IncomingMessage, ServerResponse, createServer } from 'node:http'
import { Server } from 'socket.io'
import next from 'next'
import { io } from 'socket.io-client'
import { Sequelize } from 'sequelize'
import { defineModels } from '@/utility/databaseInitialization'
import { getUserDAO } from '@/data-access/chatUsers'
import initEventHandlers from './initEventHandlers'

export interface IConfig {
    cors: {
        origin: string[]
    }
    serverIsForDevelopment: boolean
    hostname: string
    port: number
}

export async function createNextApp({ serverIsForDevelopment, hostname, port }: IConfig) {
    const app = next({ dev: serverIsForDevelopment, hostname, port: port })
    await app.prepare()
    const handler = app.getRequestHandler()
    const httpServer = createServer(handler)
    httpServer.listen(port)
    return httpServer
}

export async function createApp(httpServer: ReturnType<typeof createServer>, config: IConfig, sequelize: Sequelize) {
    const ioServer = new Server(httpServer, {
        cors: { origin: '*' },
    })

    const { Channels, Messages, Users, UsersChannels } = defineModels(sequelize)
    const usersDAO = getUserDAO(Users, Messages)
    //InitAuth(args) should be here
    initEventHandlers({ ioServer: ioServer, usersDAO: usersDAO })

    return {
        async close() {
            ioServer.close()
        },
        async disconnectDB() {
            sequelize.close()
        },
    }
}
