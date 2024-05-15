import { Sequelize } from "sequelize"
import { loadEnvVariables } from "./utility/loadingEnvironmentVariable"
import { IConfig, createApp, createNextApp } from "./webSocketServer/createApp"
import { getChannelsDAO } from "./data-access/chatChannels"
import {  getMessagesDAO } from "./data-access/chatMessages"
import { getUserDAO } from "./data-access/chatUsers"
import { defineModels } from "./utility/databaseInitialization"
import { connectToDb } from "./utility/databaseConnection"
import { Channels, DAO, Messages, Users, UsersChannels, sequelize } from "./data-access/DAO"

loadEnvVariables('./dev.env')

const serverConfig:IConfig = {
    cors:{
        origin:['*'],
    },
    hostname: 'localhost',
    port: 3000,
    serverIsForDevelopment: true
}


async function setupDBForDevelopment(sequelize: Sequelize, models: ReturnType<typeof defineModels>) {
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
    await connectToDb(sequelize,'dev')
    await setupDBForDevelopment(sequelize,{Channels,Messages,Users,UsersChannels}) 
    const nextAppServer = await createNextApp({...serverConfig})
    await createApp(
        nextAppServer,
        serverConfig,
        DAO.channelsDAO,
        DAO.messagesDAO,
        DAO.usersDAO,
        sequelize)
    
    nextAppServer.listen(serverConfig.port)
    console.log('App ready on port ' + serverConfig.port)
}

startServer()