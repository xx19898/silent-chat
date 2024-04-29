import { defineModels } from '@/utility/databaseInitialization'
import { Sequelize } from 'sequelize'

export async function dropAllTablesInTheDatabase(sequelize: Sequelize) {
    await sequelize.drop()
}

export async function deleteAllRowsOnAllTables(sequelize: Sequelize) {
    const { Channels, Messages, Users } = defineModels(sequelize)

    await Messages.destroy({ where: {} })
    await Channels.destroy({ where: {} })
    await Users.destroy({ where: {} })
}
