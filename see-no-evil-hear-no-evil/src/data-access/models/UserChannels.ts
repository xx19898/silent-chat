import { DataTypes } from 'sequelize'

export interface UsersChannelsAttributes {
    username: string
    channelId: string
    id: string
}

export const UsersChannel = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        primaryKey: false,
    },
    channelId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        primaryKey: false,
    },
}
