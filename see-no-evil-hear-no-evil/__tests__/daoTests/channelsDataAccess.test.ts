import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { deleteAllRowsOnAllTables, setupDBAccessObject } from '../databaseTestUtility'
import { defineModels } from '@/utility/databaseInitialization'
import { connectToDb } from '@/utility/databaseConnection'
import { getChannelsDAO } from '@/data-access/chatChannels'
import { getUserDAO } from '@/data-access/chatUsers'
import { getMessagesDAO } from '@/data-access/chatMessages'
import { UsersChannel } from '@/data-access/models/UserChannels'

describe('Testing channel CRUD functions', () => {
    const sequelize = setupDBAccessObject()

    beforeAll(async () => {
        await connectToDb(sequelize, 'test')
        defineModels(sequelize)
        await sequelize.sync()
        await deleteAllRowsOnAllTables(sequelize)
    })
    afterAll(async () => {
        await deleteAllRowsOnAllTables(sequelize)
    })
    afterEach(async () => {
        await deleteAllRowsOnAllTables(sequelize)
    })

    test('creating new Message', async () => {
        const { Channels } = defineModels(sequelize)
        await Channels.create({ name: 'firstChannel', id: 'idxxxxxxxx' })
        const createdChannel = await Channels.findOne({ where: { name: 'firstChannel' } })
        expect(createdChannel).toBeDefined()
        expect(createdChannel!.dataValues.id).toBe('idxxxxxxxx')
    })

    test('testing channelsDAO create new message function', async () => {
        const { Channels, Messages, Users } = defineModels(sequelize)
        const { createNewChannel } = getChannelsDAO(Channels, Messages, Users)
        await createNewChannel({ name: 'firstChannel' })
        const createdChannel = await Channels.findOne({ where: { name: 'firstChannel' } })
        expect(createdChannel).toBeDefined()
    })

    test('testing channelsDAO get channel by name', async () => {
        const { Channels, Messages, Users } = defineModels(sequelize)
        const { createNewChannel, getChannelByName } = getChannelsDAO(Channels, Messages, Users)
        await createNewChannel({ name: 'firstChannel' })
        const createdChannel = await getChannelByName({
            name: 'firstChannel',
            messagesIncluded: false,
            usersIncluded: false,
        })

        expect(createdChannel).toBeDefined()
        expect(createdChannel.channel?.name).toBe('firstChannel')
    })

    test('get messages belonging to the channel(by name) ordered by creation date and time', async () => {
        const { UsersChannels, Channels, Messages, Users } = defineModels(sequelize)
        const { createNewChannel, getChannelByName } = getChannelsDAO(Channels, Messages, Users)
        const { createNewUser } = getUserDAO(Users, Messages)
        const { createNewMessage } = getMessagesDAO(Messages, Users)

        await createNewChannel({ name: 'firstChannel' })
        const createdChannel = await getChannelByName({
            name: 'firstChannel',
            messagesIncluded: false,
            usersIncluded: false,
        })
        console.log({ createdChannel })
        const createdChannelId = createdChannel.channel?.id
        await createNewUser({ password: 'testPassword', username: 'testUsername1' })
        await createNewUser({ password: 'testPassword', username: 'testUsername2' })
        await UsersChannels.create({ channelId: createdChannelId!, username: 'testUsername1', id: 'uniqueId' })
        const result = await getChannelByName({ usersIncluded: true, name: 'firstChannel', messagesIncluded: false })
        console.log({ result })
        expect(result).toBeDefined()
    })
    /*
    test('get list of users belonging to the channel')
*/
})
