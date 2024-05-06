import { ModelDefined } from 'sequelize'
import { v4 as uuidv } from 'uuid'
import { ChannelAttributes } from './models/Channel'
import { MessageAttributes } from './models/Message'
import { UserAttributes } from './models/User'
import { Message } from './chatMessages'
import { User } from './chatUsers'
import { Messages, Users } from '@/utility/sequelize'
import { UsersChannelsAttributes } from './models/UserChannels'

export interface Channel {
    id: string
    name: string
    messages?: Message[]
    users?: User[]
}

export interface ChannelsDAO {
    createNewChannel: ({
        name,
    }: {
        name: string
    }) => Promise<{ error: undefined; channel: Channel } | { error: string; channel: undefined }>
    getChannelByName: ({
        name,
        usersIncluded,
        messagesIncluded,
    }: {
        name: string
        usersIncluded: boolean
        messagesIncluded: boolean
    }) => Promise<{ error: undefined; channel: Channel } | { error: string; channel: undefined }>
    getChannelById: ({
        id,
        usersIncluded,
        messagesIncluded,
    }: {
        id: string
        usersIncluded: boolean
        messagesIncluded: boolean
    }) => Promise<{ error: undefined; channel: Channel } | { error: string; channel: undefined }>
    addUserToChannel: ({
        username,
        channelId,
    }: {
        username: string
        channelId: string
    }) => Promise<{ error: undefined } | { error: string }>
}

async function getChannelWithCorrectAssociations({
    usersIncluded,
    messagesIncluded,
    id,
    name,
    Channels,
}: {
    usersIncluded: boolean
    messagesIncluded: boolean
    id?: string
    name?: string
    Channels: ModelDefined<ChannelAttributes, {}>
    UsersChannels: ModelDefined<UsersChannelsAttributes, UsersChannelsAttributes>
}) {
    if (id) {
        if (usersIncluded && messagesIncluded) {
            const searchResult = await Channels.findOne({ where: { id: id }, include: { all: true } })
            return searchResult
        }
        if (usersIncluded) return await Channels.findOne({ where: { id: id }, include: { model: Users, as: 'users' } })
        if (messagesIncluded)
            return await Channels.findOne({ where: { id: id }, include: { model: Messages, as: 'messages' } })
        return Channels.findOne({ where: { id: id } })
    } else {
        if (usersIncluded && messagesIncluded) {
            const searchResult = await Channels.findOne({
                where: { name: name },
                include: [
                    { model: Messages, as: 'messages' },
                    { model: Users, as: 'users' },
                ],
            })
            return searchResult
        }
        if (usersIncluded)
            return await Channels.findOne({ where: { name: name }, include: { model: Users, as: 'users' } })
        if (messagesIncluded)
            return await Channels.findOne({ where: { name: name }, include: { model: Messages, as: 'messages' } })
        return Channels.findOne({ where: { name: name } })
    }
}

export function getChannelsDAO(
    Channels: ModelDefined<ChannelAttributes, {}>,
    Messages: ModelDefined<MessageAttributes, {}>,
    Users: ModelDefined<UserAttributes, {}>,
    UsersChannels: ModelDefined<UsersChannelsAttributes, UsersChannelsAttributes>
): ChannelsDAO {
    const channelsDAO: ChannelsDAO = {
        createNewChannel: async function ({ name }: { name: string }) {
            try {
                const creationResult = await Channels.create({ id: uuidv(), name: name })
                return { channel: { id: creationResult.dataValues.id, name: name }, error: undefined }
            } catch (e) {
                return { channel: undefined, error: e as string }
            }
        },
        getChannelById: async function ({ id }: { id: string }) {
            try {
                const searchResult = await Channels.findOne({ where: { id: id } })
                if (searchResult === null) return { error: 'No user with such id', channel: undefined }
                return {
                    error: undefined,
                    channel: { id: searchResult.dataValues.id, name: searchResult.dataValues.name },
                }
            } catch (e) {
                return { error: 'No user with such id', channel: undefined }
            }
        },
        getChannelByName: async function ({
            name,
            usersIncluded,
            messagesIncluded,
        }: {
            name: string
            messagesIncluded: boolean
            usersIncluded: boolean
        }) {
            try {
                const searchResult = await getChannelWithCorrectAssociations({
                    Channels: Channels,
                    messagesIncluded: messagesIncluded,
                    usersIncluded: usersIncluded,
                    name: name,
                    UsersChannels: UsersChannels,
                })
                if (searchResult === null) return { error: 'No channels with such name', channel: undefined }
                return {
                    error: undefined,
                    channel: {
                        id: searchResult.dataValues.id,
                        name: searchResult.dataValues.name,
                        messages: searchResult.dataValues.messages,
                        users: searchResult.dataValues.users,
                    },
                }
            } catch (e) {
                return { error: e as string, channel: undefined }
            }
        },
        addUserToChannel: async function ({ username, channelId }) {
            try {
                await UsersChannels.create({ channelId: channelId, username: username, id: uuidv() })
                return { error: undefined }
            } catch (e) {
                return { error: e as string }
            }
        },
    }
    return channelsDAO
}
