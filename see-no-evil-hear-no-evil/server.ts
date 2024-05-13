import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'
import { connectToDb } from './src/utility/databaseConnection.js'
import { Sequelize } from 'sequelize'
import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable.js'
import { defineModels } from '@/utility/databaseInitialization.js'
import Message from '@/data-access/models/Message.js'
import { connect } from 'node:http2'
import { IConfig, createApp, createNextApp } from '@/webSocketServer/createApp.js'

loadEnvVariables('./dev.env')

const serverConfig:IConfig = {
    cors:{
        origin:['*'],
    },
    hostname: 'localhost',
    port: 3000,
    serverIsForDevelopment: true
}

const connectionString = `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${'postgres-dev'}:${5432}/${process.env.POSTGRESDB_DATABASE}`
console.log({ connectionString })
export const sequelize = new Sequelize(connectionString)

async function setupDBForDevelopment(sequelize: Sequelize) {
    const { Channels, Messages, Users, UsersChannels } = defineModels(sequelize)
    await sequelize.sync()
    await Users.destroy({ where: {}, cascade: true })
    await Channels.destroy({ where: {}, cascade: true })
    await Messages.destroy({ where: {}, cascade: true })
    await UsersChannels.destroy({ where: {}, cascade: true })

    await Users.create({ password: 'randomPassword', username: 'user1' })
    await Users.create({ password: 'randomPassword', username: 'user2' })

    await Channels.create({ id: 'xxki900ka', name: 'Public Channel' })

    await UsersChannels.create({ channelId: 'xxki900ka', id: 'xdwqekdf', username: 'user1' })
    await UsersChannels.create({ channelId: 'xxki900ka', id: 'xdwqekdfx', username: 'user2' })
}

async function startServer(){    
    const nextAppServer = await createNextApp({...serverConfig})

    await setupDBForDevelopment(sequelize)
    await connectToDb(sequelize,'dev')

    const app = await createApp(nextAppServer,serverConfig,sequelize)
    console.log('App ready on port ' + serverConfig.port)
}

startServer()
