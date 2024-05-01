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

    Users.hasMany(Messages, { as: 'sender', foreignKey: 'senderUsername' })
    Users.hasMany(Messages, { as: 'receiver', foreignKey: 'receiverUsername' })
    Messages.belongsTo(Users, { as: 'sender', foreignKey: 'senderUsername' })
    Messages.belongsTo(Users, {
        as: 'receiver',
        foreignKey: 'receiverUsername',
    })
    /*
    Channels.hasMany(Messages, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'message',
    })
    Messages.belongsTo(Channels, { as: 'channel' })
    */
    return { Channels, Messages, Users }
}

// TODO: define models, create simple user creating & user querying func, write test
