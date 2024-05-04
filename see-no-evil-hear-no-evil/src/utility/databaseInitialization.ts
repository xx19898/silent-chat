import Channel, { ChannelAttributes } from '@/data-access/models/Channel'
import Message, { MessageAttributes } from '@/data-access/models/Message'
import User, { UserAttributes } from '@/data-access/models/User'
import { ModelDefined, Sequelize } from 'sequelize'

export function defineModels(sequelize: Sequelize) {
    const Users: ModelDefined<UserAttributes, {}> = sequelize.define('User', User)
    const Channels: ModelDefined<ChannelAttributes, {}> = sequelize.define('Channel', Channel)
    const Messages: ModelDefined<MessageAttributes, MessageAttributes> = sequelize.define('Message', Message)

    Users.belongsToMany(Channels, { through: 'UserChannels', as: 'channels' })
    Channels.belongsToMany(Users, { through: 'UserChannels', as: 'users' })

    Users.hasMany(Messages, { as: 'author', foreignKey: 'authorUsername' })
    Messages.belongsTo(Users, { as: 'author', foreignKey: 'authorUsername' })

    Channels.hasMany(Messages, {
        foreignKey: 'channelId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'message',
    })
    Messages.belongsTo(Channels, { as: 'channel', foreignKey: 'channelId' })

    return { Channels, Messages, Users }
}

// TODO: define models, create simple user creating & user querying func, write test
