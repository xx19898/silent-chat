import { Sequelize } from 'sequelize'
import { connectToDb } from './databaseConnection'
import User from '@/data-access/models/User'
import Channel from '@/data-access/models/Channel'
import Message from '@/data-access/models/Message'
import { defineModels } from './databaseInitialization'

const sequelize = new Sequelize(
    `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${'postgres-dev'}:${5432}/${process.env.POSTGRESDB_DATABASE}`
)

connectToDb(sequelize, 'dev')

const { Users, Channels, Messages } = defineModels(sequelize)

export { Users, Channels, Messages }
