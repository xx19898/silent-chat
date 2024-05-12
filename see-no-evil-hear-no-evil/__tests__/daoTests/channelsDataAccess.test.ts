import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { deleteAllRowsOnAllTables, setupDBAccessObject } from '../databaseTestUtility'
import { defineModels } from '@/utility/databaseInitialization'
import { connectToDb } from '@/utility/databaseConnection'
import { getChannelsDAO } from '@/data-access/chatChannels'
import { getUserDAO } from '@/data-access/chatUsers'
import { getMessagesDAO } from '@/data-access/chatMessages'
import { UsersChannel } from '@/data-access/models/UserChannels'
import { QueryTypes } from 'sequelize'

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
        const { Channels, Messages, Users, UsersChannels } = defineModels(sequelize)
        const { createNewChannel } = getChannelsDAO(Channels, Messages, Users, UsersChannels,sequelize)
        await createNewChannel({ name: 'firstChannel' })
        const createdChannel = await Channels.findOne({ where: { name: 'firstChannel' } })
        expect(createdChannel).toBeDefined()
    })

    test('testing channelsDAO get channel by name', async () => {
        const { Channels, Messages, Users, UsersChannels } = defineModels(sequelize)
        const { createNewChannel, getChannelByName } = getChannelsDAO(
            Channels, Messages, Users, UsersChannels,sequelize)
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
        const { createNewChannel, getChannelByName, addUserToChannel } = getChannelsDAO(
            Channels,
            Messages,
            Users,
            UsersChannels,sequelize
        )
        const { createNewUser } = getUserDAO(Users, Messages)
        const { createNewMessage } = getMessagesDAO(Messages, Users)

        await createNewChannel({ name: 'firstChannel' })
        const createdChannel = await getChannelByName({
            name: 'firstChannel',
            messagesIncluded: false,
            usersIncluded: false,
        })
        const createdChannelId = createdChannel.channel?.id!
        await createNewUser({ password: 'testPassword', username: 'testUsername1' })
        await createNewUser({ password: 'testPassword', username: 'testUsername2' })

        await createNewMessage({
            authorUsername: 'testUsername1',
            channelId: createdChannelId,
            content: 'test content',
        })
        await createNewMessage({
            authorUsername: 'testUsername2',
            channelId: createdChannelId,
            content: 'test content',
        })

        await addUserToChannel({ channelId: createdChannelId!, username: 'testUsername1' })
        await addUserToChannel({ channelId: createdChannelId!, username: 'testUsername2' })

        const result = await getChannelByName({ usersIncluded: true, name: 'firstChannel', messagesIncluded: true })

        expect(result).toBeDefined()
        expect(result.channel!.users!.length).toBe(2)
        expect(result.channel!.messages!.length).toBe(2)
    })
    
    test('get list of channels with number of users that are on them', async () => {
        const { UsersChannels, Channels, Messages, Users } = defineModels(sequelize)
        const { createNewChannel, getChannelByName, addUserToChannel,getChannelsWithUserCount } = getChannelsDAO(
            Channels,
            Messages,
            Users,
            UsersChannels,sequelize
        )
        
        const { createNewUser } = getUserDAO(Users, Messages)
        
        await createNewUser({ password: 'testPassword', username: 'testUsername1' })
        await createNewUser({ password: 'testPassword', username: 'testUsername2' })

        await createNewChannel({ name: 'firstChannel' })
        await createNewChannel({name: 'secondChannel'})
        await createNewChannel({name: 'thirdChannel'})

        const createdChannel = await getChannelByName({
            name: 'firstChannel',
            messagesIncluded: false,
            usersIncluded: false,
        })
        const secondCreatedChannel = await getChannelByName({
            name: 'secondChannel',
            messagesIncluded: false,
            usersIncluded: false
        })
        
        const createdChannelId = createdChannel.channel?.id!
        const secondCreatedChannelId = secondCreatedChannel.channel?.id!

        await addUserToChannel({ channelId: createdChannelId!, username: 'testUsername1' })
        await addUserToChannel({ channelId: createdChannelId!, username: 'testUsername2' })
        await addUserToChannel({channelId: secondCreatedChannelId,username: 'testUsername1'})
        
        const result = await getChannelsWithUserCount()
        expect(result).toBeDefined()
        expect(result.channels).toBeDefined()
        expect(result.channels!.length).toBe(3)
    })
})
