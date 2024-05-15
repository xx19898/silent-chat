import { ChannelsDAO, getChannelsDAO } from "./chatChannels"
import { MessagesDAO, getMessagesDAO } from "./chatMessages"
import { UsersDAO, getUserDAO } from "./chatUsers"
import Message from "./models/Message"
import { defineModels } from "@/utility/databaseInitialization"
import { Sequelize } from "sequelize"
import pg from 'pg';
import { loadEnvVariables } from "@/utility/loadingEnvironmentVariable"

loadEnvVariables('./dev.env')

interface IDAO{
    channelsDAO: ChannelsDAO
    messagesDAO: MessagesDAO
    usersDAO: UsersDAO
}

const connectionString = `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${'postgres-dev'}:${5432}/${process.env.POSTGRESDB_DATABASE}`
export const sequelize = new Sequelize(connectionString,{
    dialectModule: pg
})
const { Channels, Messages, Users, UsersChannels } = defineModels(sequelize)
export {Channels,Messages, Users, UsersChannels}

export const DAO: IDAO = {
    channelsDAO: getChannelsDAO(Channels,Messages,Users,UsersChannels,sequelize),
    messagesDAO: getMessagesDAO(Messages,Users),
    usersDAO: getUserDAO(Users,Messages)
} 


