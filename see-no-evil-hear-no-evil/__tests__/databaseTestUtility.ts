import { defineModels } from '@/utility/databaseInitialization'
import { Sequelize } from 'sequelize'

export async function dropAllTablesInTheDatabase(sequelize: Sequelize) {
    await sequelize.drop()
}

export async function deleteAllRowsOnAllTables(sequelize: Sequelize) {
    console.log('DELETING ALL ROWS ON ALL TABLES')
    const { Channels, Messages, Users } = defineModels(sequelize)

    await Messages.destroy({ where: {}, cascade: true })
    await Channels.destroy({ where: {}, cascade: true })
    await Users.destroy({ where: {}, cascade: true })
}
