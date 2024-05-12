import { getUserDAO } from '@/data-access/chatUsers'
import { defineModels } from '@/utility/databaseInitialization'
import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable'
import { Sequelize } from 'sequelize'
import { describe, expect, test } from 'vitest'
import { deleteAllRowsOnAllTables } from './databaseTestUtility'

describe('Testing database utility functions', () => {
    loadEnvVariables('./test.env')
    const connectionString = `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${'postgres-test'}:${5433}/${process.env.POSTGRESDB_DATABASE}`
    const sequelize = new Sequelize(connectionString)

    test('deleting all rows works', async () => {
        const { Users, Messages } = defineModels(sequelize)
        const { createNewUser, userExists } = getUserDAO(Users, Messages)

        const { user } = await createNewUser({ username: 'testUser', password: 'testPassword' })
        await deleteAllRowsOnAllTables(sequelize)
        const { userExists: testUserExists } = await userExists({ username: 'testUser' })
        expect(testUserExists).toBeFalsy()
    })
})
