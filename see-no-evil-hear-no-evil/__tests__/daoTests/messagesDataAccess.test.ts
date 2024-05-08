import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable'
import { Sequelize } from 'sequelize'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { deleteAllRowsOnAllTables } from '../databaseTestUtility'
import { connectToDb } from '@/utility/databaseConnection'
import { defineModels } from '@/utility/databaseInitialization'
import { getUserDAO } from '@/data-access/chatUsers'
import { getMessagesDAO } from '@/data-access/chatMessages'

describe.sequential('Testing message CRUD functions', () => {
    loadEnvVariables('./test.env')
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
    afterEach(async () => {
        await deleteAllRowsOnAllTables(sequelize)
    }),
        test('New message gets created correctly', async () => {
            const { Users, Messages } = defineModels(sequelize)
            const { createNewUser, userExists } = getUserDAO(Users, Messages)
            const { createNewMessage } = getMessagesDAO(Messages, Users)

            await createNewUser({ password: 'testPassword', username: 'username1' })
            await createNewUser({ password: 'testPassword', username: 'username2' })

            //TODO: fix after the channels tests
            const { message, error } = await createNewMessage({
                content: 'test content',
                authorUsername: 'username1',
                channelId: '',
            })
            console.log({ error })
            expect(error).toBeUndefined()
            expect(message).toBeDefined()
            const { content } = message!
            expect(content).toBe('test content')
        })
})
