import { connectToDb } from '@/utility/databaseConnection'
import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable'
import { Sequelize } from 'sequelize'
import { describe, expect, test } from 'vitest'

describe('Connecting to the database', () => {
    test('connecting to the database', async () => {
        loadEnvVariables('./dev.env')
        const connectionString = `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${'postgres-test'}:${5433}/${process.env.POSTGRESDB_DATABASE}`
        const sequelize = new Sequelize(connectionString)
        const { error } = await connectToDb(sequelize, 'test')
        expect(error).toBeUndefined()

        await sequelize.close()
    })
})
