import { defineModels } from '@/utility/databaseInitialization'
import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable'
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

export function setupDBAccessObject() {
    loadEnvVariables('./test.env')
    const connectionString = `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${'postgres-test'}:${5433}/${process.env.POSTGRESDB_DATABASE}`
    const sequelize = new Sequelize(connectionString)
    return sequelize
}
