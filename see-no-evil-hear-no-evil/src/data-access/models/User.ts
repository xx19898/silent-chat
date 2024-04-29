import { DataTypes } from 'sequelize'

export interface UserAttributes {
    username: string
    password: string
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
