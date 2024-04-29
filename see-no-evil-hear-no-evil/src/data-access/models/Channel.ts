import { DataTypes, Model } from 'sequelize'

export interface ChannelAttributes {
    id: string
}

const Channel = {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
}

export default Channel
