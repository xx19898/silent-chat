import { Messages } from '@/utility/sequelize'
import { DataTypes } from 'sequelize'
import { MessageAttributes } from './Message'

export interface UserAttributes {
    id: string
    username: string
    password: string
    author: MessageAttributes[]
}

export const User = {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        len: [8, 10],
    },
}

export default User
