import { connectToDb } from '@/utility/databaseConnection'
import { defineModels } from '@/utility/databaseInitialization'
import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable'
import { Sequelize } from 'sequelize'
import { afterAll, describe, expect, test } from 'vitest'
import { deleteAllRowsOnAllTables } from '../databaseTestUtility'

describe('Defining and initializing models', () => {
    loadEnvVariables('./dev.env')
    const connectionString = `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${'postgres-test'}:${5433}/${process.env.POSTGRESDB_DATABASE}`
    const sequelize = new Sequelize(connectionString)

    afterAll(async () => {
        loadEnvVariables('./dev.env')
        await deleteAllRowsOnAllTables(sequelize)
        await sequelize.close()
    })

    test('defining and initializing models', async () => {
        const { error } = await connectToDb(sequelize, 'test')
        expect(error).toBeUndefined()

        try {
            const { Channels, Messages, Users } = defineModels(sequelize)
            await sequelize.sync()
        } catch (e) {
            console.log({ e })
        }
    })

    test('making sure all the needed models exist on the database', async () => {
        const { Channels, Messages, Users } = defineModels(sequelize)
        await sequelize.sync()

        const describeUsers = await Users.describe()
        const describeChannels = await Channels.describe()
        const describeMessages = await Messages.describe()

        expect(describeUsers).toHaveProperty('username')
        expect(describeUsers).toHaveProperty('password')

        expect(describeChannels).toHaveProperty('id')

        expect(describeMessages).toHaveProperty('content')
        expect(describeMessages).toHaveProperty('id')
    })
    /*
        test('inserting into Users', async () => {
            await deleteAllRowsOnAllTables(sequelize)
            const { Channels, Messages, Users } = defineModels(sequelize)
            await Users.create({ username: 'user1', password: 'password18888' })

            const user1 = await Users.findOne({ where: { username: 'user1' } })

            expect(user1).toHaveProperty('password')
        }),
     */
})
