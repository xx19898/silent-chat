import { DataTypes, Model } from 'sequelize'
import { MessageAttributes } from './Message'
import { UserAttributes } from './User'

export interface ChannelAttributes {
    id: string
    name: string
    messages: MessageAttributes[]
    users: UserAttributes[]
}

const Channel = {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: false,
    },
}

export default Channel
