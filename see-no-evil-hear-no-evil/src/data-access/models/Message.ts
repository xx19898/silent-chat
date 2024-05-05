import { DataTypes } from 'sequelize'
import { User } from '../chatUsers'

export interface MessageAttributes {
    id: string
    content: string
    authorUsername: string
    channelId: string
}

const Message = {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        len: [1, 200],
    },
}

export default Message
