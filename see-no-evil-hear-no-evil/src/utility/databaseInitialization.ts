import Channel, { ChannelAttributes } from '@/data-access/models/Channel'
import Message, { MessageAttributes } from '@/data-access/models/Message'
import User, { UserAttributes } from '@/data-access/models/User'
import { ModelDefined, Sequelize } from 'sequelize'

export function defineModels(sequelize: Sequelize) {
    const Users: ModelDefined<UserAttributes, {}> = sequelize.define(
        'Users',
        User
    )
    const Channels: ModelDefined<ChannelAttributes, {}> = sequelize.define(
        'Channels',
        Channel
    )
    const Messages: ModelDefined<MessageAttributes, MessageAttributes> =
        sequelize.define('Messages', Message)

    Users.belongsToMany(Channels, { through: 'UserChannels', as: 'channels' })
    Channels.belongsToMany(Users, { through: 'UserChannels', as: 'users' })

    Messages.hasOne(Users, { as: 'sender', foreignKey: 'senderUsername' })
    Messages.hasOne(Users, { as: 'receiver', foreignKey: 'receiverUsername' })

    Channels.hasMany(Messages, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'messages',
    })
    Messages.belongsTo(Channels, { as: 'channel' })

    return { Channels, Messages, Users }
}

// TODO: define models, create simple user creating & user querying func, write test
