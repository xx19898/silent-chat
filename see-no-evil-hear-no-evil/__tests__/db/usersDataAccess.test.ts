import { connectToDb } from '@/utility/databaseConnection'
import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable'
import { Sequelize } from 'sequelize'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { deleteAllRowsOnAllTables } from '../databaseTestUtility'
import { defineModels } from '@/utility/databaseInitialization'
import User from '@/data-access/models/User'

describe('Testing user CRUD functions', () => {
    loadEnvVariables('./dev.env')
    const connectionString = `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${'postgres-test'}:${5433}/${process.env.POSTGRESDB_DATABASE}`
    const sequelize = new Sequelize(connectionString)

    beforeAll(async () => {
        await connectToDb(sequelize, 'test')
        await deleteAllRowsOnAllTables(sequelize)
    })
    afterAll(async () => {
        await deleteAllRowsOnAllTables(sequelize)
        await sequelize.close()
    })

    test('creating new User', async () => {
        const { Channels, Messages, Users } = defineModels(sequelize)
        await Users.create({ username: 'user1', password: 'password18888' })

        const user1 = await Users.findOne({ where: { username: 'user1' } })

        expect(user1?.dataValues.password).toBe('password18888')

        await Users.destroy({ where: {} })
    })

    test('creating new User and message which has him as sender and receiver', async () => {
        const { Channels, Messages, Users } = defineModels(sequelize)
        await Users.create({ username: 'user1', password: 'password18888' })

        const user1 = await Users.findOne({
            where: { username: 'user1' },
            include: { as: 'messages', model: Messages },
        })

        await Messages.create({
            content: 'xd',
            id: 'xd',
            receiverUsername: 'user1',
            senderUsername: 'user1',
        })

        const message = await Messages.findOne({
            where: { id: 'xd' },
            include: { as: 'sender', model: Users },
        })

        console.log({ message })

        expect(message?.dataValues.content).toBe('xd')
    })
})
