import { Sequelize } from 'sequelize'

export async function connectToDb(env: 'test' | 'dev') {
    const connectionString = `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${env === 'test' ? 'postgres-test' : 'postgres-dev'}:${env === 'test' ? 5433 : 5432}/${process.env.POSTGRESDB_DATABASE}`
    console.log({ connectionString })
    const sequelize = new Sequelize(connectionString)

    try {
        await sequelize.authenticate()
        console.log(
            `Connection with the ${process.env.POSTGRES_DB} established successfully`
        )
        return { error: undefined }
    } catch (e) {
        console.error('Unable to connect to the database: ', e)
        return { error: e }
    }
}
