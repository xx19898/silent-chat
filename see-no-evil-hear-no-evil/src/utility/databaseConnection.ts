import { Sequelize } from 'sequelize'

export async function connectToDb(sequelize: Sequelize, env: 'test' | 'dev') {
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
