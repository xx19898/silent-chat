import { connectToDb } from '@/utility/databaseConnection'
import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable'
import { Sequelize } from 'sequelize'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { deleteAllRowsOnAllTables } from '../databaseTestUtility'
import { defineModels } from '@/utility/databaseInitialization'
import { getUserDAO } from '@/data-access/chatUsers'

describe.sequential('Testing user CRUD functions', () => {
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
    afterEach(async () => {
        await deleteAllRowsOnAllTables(sequelize)
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
        const createdUser = await Users.findOne({ where: { username: 'user1' } })
        expect(createdUser).toBeDefined()

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

        const user1 = await Users.findOne({
            where: { username: 'user1' },
            include: { as: 'sender', model: Messages },
        })

        expect(message?.dataValues.content).toBe('xd')
    })

    test('creating two new Users and message between them, retrieving the message from both receiver and sender ends', async () => {
        const { Messages, Users } = defineModels(sequelize)
        await Users.create({ username: 'user1', password: 'password18888' })
        await Users.create({ username: 'user2', password: 'password199999' })

        const firstUserCreated = await Users.findOne({ where: { username: 'user1' } })
        const secondUserCreated = await Users.findOne({ where: { username: 'user2' } })

        expect(firstUserCreated).toBeDefined()
        expect(secondUserCreated).toBeDefined()

        await Messages.create({
            content: 'xd',
            id: 'xd',
            receiverUsername: 'user1',
            senderUsername: 'user2',
        })

        await Messages.create({
            content: 'xd2',
            id: 'xd2',
            receiverUsername: 'user1',
            senderUsername: 'user2',
        })

        const firstUser = await Users.findOne({
            where: { username: 'user1' },
            include: { as: 'receiver', model: Messages },
        })
        const secondUser = await Users.findOne({
            where: { username: 'user2' },
            include: { as: 'sender', model: Messages },
        })

        expect(firstUser?.dataValues.receiver.length).toBe(2)
        expect(secondUser?.dataValues.sender.length).toBe(2)
    }),
        test('chatUsers DAO user creation function', async () => {
            const { Users, Messages } = defineModels(sequelize)
            const { createNewUser } = getUserDAO(Users, Messages)
            const { error, user } = await createNewUser({
                password: 'testPassword',
                username: 'testUsername',
            })
            expect(error).toBeUndefined()
            expect(user).toBeDefined()
            expect(user!.password).toBe('testPassword')
            expect(user!.username).toBe('testUsername')
        }),
        test('chatUsers DAO user creating two users with same username', async () => {
            const { Users, Messages } = defineModels(sequelize)
            const { createNewUser } = getUserDAO(Users, Messages)
            await createNewUser({
                password: 'testPassword',
                username: 'testUsername',
            })

            const { error: secondError, user: secondUser } = await createNewUser({
                password: 'testPassword',
                username: 'testUsername',
            })
            expect(secondError).toBeDefined()
        }),
        test('chatUsers DAO checking whether a user with a certain username already exists', async () => {
            const { Users, Messages } = defineModels(sequelize)
            const { createNewUser, userExists } = getUserDAO(Users, Messages)
            await createNewUser({
                password: 'testPassword',
                username: 'testUsername',
            })

            const { error, userExists: createdUserExists } = await userExists({ username: 'testUsername' })
            expect(error).toBeUndefined()
            expect(createdUserExists).toBeTruthy()

            const { error: secondError, userExists: nonExistantUserExists } = await userExists({ username: 'nonExistantUser' })
            expect(secondError).toBeUndefined()
            expect(nonExistantUserExists).toBeFalsy()
        }),
        test('chatUsers DAO getUsers gets all users', async () => {
            const { Users, Messages } = defineModels(sequelize)
            const { createNewUser, getUsers } = getUserDAO(Users, Messages)
            await createNewUser({
                password: 'testPassword',
                username: 'testUsername1',
            })
            await createNewUser({
                password: 'testPassword',
                username: 'testUsername2',
            })
            const { error, users } = await getUsers()

            expect(error).toBeUndefined()
            expect(users!.length).toBe(2)
        }),
        test('chatUsers DAO getUserByUsername gets asked user', async () => {
            const { Users, Messages } = defineModels(sequelize)
            const { createNewUser, getUserByUsername } = getUserDAO(Users, Messages)
            await createNewUser({
                password: 'testPassword',
                username: 'testUsername1',
            })

            const { error: firstQueryError, user: firstQueryUser } = await getUserByUsername({ targetUsername: 'testUsername1' })
            expect(firstQueryError).toBe(undefined)
            expect(firstQueryUser?.password).toBe('testPassword')
            const { error: secondQueryError, user: secondQueryUser } = await getUserByUsername({ targetUsername: 'nonexistant' })
            expect(secondQueryUser).toBeUndefined()
        }),
        test('chatUsers DAO deleteByUsername deletes chosen user', async () => {
            const { Users, Messages } = defineModels(sequelize)
            const { createNewUser, deleteUserByUsername, userExists } = getUserDAO(Users, Messages)
            await createNewUser({
                password: 'testPassword',
                username: 'testUsername1',
            })

            const { error, userExists: preDeletionExistanceCheck } = await userExists({ username: 'testUsername1' })
            expect(preDeletionExistanceCheck).toBeTruthy()

            await deleteUserByUsername({ username: 'testUsername1' })
            const { userExists: postDeletionExistanceCheck } = await userExists({ username: 'testUsername1' })
            expect(postDeletionExistanceCheck).toBeFalsy()
        })
})
