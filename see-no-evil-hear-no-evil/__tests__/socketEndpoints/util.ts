import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable.js'
import { IConfig, createApp, createNextApp } from '../../src/webSocketServer/createApp.js'
import { Sequelize } from 'sequelize'
import { defineModels } from '@/utility/databaseInitialization.js'
import { getUserDAO } from '@/data-access/chatUsers.js'
import { io as ioc, type Socket as ClientSocket } from 'socket.io-client'
import { Server, type Socket as ServerSocket } from 'socket.io'
import { connectToDb } from '@/utility/databaseConnection.js'

/*
function listen(httpServer, ...args) {
    return new Promise((resolve) => {
        httpServer.listen(...args, () => {
            resolve(httpServer.address().port)
        })
    })
}
*/

export function waitFor(socket: ServerSocket | ClientSocket, event: string) {
    return new Promise((resolve) => {
        socket.once(event, resolve)
    })
}

export async function setupSocketTest() {
    loadEnvVariables('./test.env')

    const connectionString = `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${'postgres-test'}:${5433}/${process.env.POSTGRESDB_DATABASE}`
    const sequelize = new Sequelize(connectionString)

    const config: IConfig = {
        cors: {
            origin: ['*'],
        },
        hostname: 'localhost',
        port: 80,
        serverIsForDevelopment: true,
    }

    const httpServer = await createNextApp({
        serverIsForDevelopment: true,
        cors: config.cors,
        hostname: config.hostname,
        port: config.port,
    })

    const { Users, Messages } = defineModels(sequelize)
    await connectToDb(sequelize,'test')
    sequelize.sync()
    const mockUser = { password: 'testPassword', username: 'First User' }  
    const { createNewUser } = getUserDAO(Users, Messages)
    await createNewUser(mockUser)

    const {
        close: closeIoServer,
        channelsDAO,
        disconnectDB,
        messagesDAO,
        usersDAO,
    } = await createApp(httpServer, config, sequelize)

    const firstUserSocket = ioc(`http://localhost:${config.port}`)
    const secondUserSocket = ioc(`http://localhost:${config.port}`)

    firstUserSocket.on('connect', () => {
        console.log('FIRST USER CONNECTED TO THE SERVER')
    })
    
    secondUserSocket.on('connect', () => {
        console.log('SECOND USER CONNECTED TO THE SERVER')
    })

    await waitFor(firstUserSocket, 'connect')
    await waitFor(secondUserSocket,'connect')
    console.log('GOT HERE')

    return {
        closeIoServer,
        firstUserSocket,
        channelsDAO,
        usersDAO,
        messagesDAO,
        sequelize,
        mockUser,
        secondUserSocket
    }
}
