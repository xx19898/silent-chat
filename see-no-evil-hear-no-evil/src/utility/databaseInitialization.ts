import Channel, { ChannelAttributes } from '@/data-access/models/Channel'
import Message, { MessageAttributes } from '@/data-access/models/Message'
import User, { UserAttributes } from '@/data-access/models/User'
import { UsersChannel, UsersChannelsAttributes } from '@/data-access/models/UserChannels'
import { ModelDefined, Sequelize } from 'sequelize'

export function defineModels(sequelize: Sequelize) {
    const Users: ModelDefined<UserAttributes, {}> = sequelize.define('User', User)
    const Channels: ModelDefined<ChannelAttributes, { name: string; id: string }> = sequelize.define('Channel', Channel)
    const Messages: ModelDefined<MessageAttributes, MessageAttributes> = sequelize.define('Message', Message)
    const UsersChannels: ModelDefined<UsersChannelsAttributes, UsersChannelsAttributes> = sequelize.define(
        'UsersChannels',
        UsersChannel
    )
    Users.belongsToMany(Channels, { through: 'UsersChannels', as: 'channels', foreignKey: 'username' })
    Channels.belongsToMany(Users, { through: 'UsersChannels', as: 'users', foreignKey: 'channelId' })

    Users.hasMany(Messages, { as: 'author', foreignKey: 'authorUsername' })
    Messages.belongsTo(Users, { as: 'author', foreignKey: 'authorUsername' })

    Channels.hasMany(Messages, {
        foreignKey: 'channelId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'messages',
    })
    Messages.belongsTo(Channels, { as: 'channels', foreignKey: 'channelId' })

    return { Channels, Messages, Users, UsersChannels }
}

// TODO: define models, create simple user creating & user querying func, write test
