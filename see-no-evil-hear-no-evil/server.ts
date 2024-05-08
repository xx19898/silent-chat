import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'
import { connectToDb } from './src/utility/databaseConnection.js'
import { Sequelize } from 'sequelize'
import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable.js'
import { defineModels } from '@/utility/databaseInitialization.js'
import Message from '@/data-access/models/Message.js'

loadEnvVariables('./dev.env')
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()
const connectionString = `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${'postgres-dev'}:${5432}/${process.env.POSTGRESDB_DATABASE}`
console.log({ connectionString })
export const sequelize = new Sequelize(connectionString)

async function setupDBForDevelopment(sequelize: Sequelize) {
    const { Channels, Messages, Users, UsersChannels } = defineModels(sequelize)
    await sequelize.sync()

    await Users.destroy({ where: {}, cascade: true })
    await Channels.destroy({ where: {}, cascade: true })
    await Messages.destroy({ where: {}, cascade: true })
    await UsersChannels.destroy({ where: {}, cascade: true })

    await Users.create({ password: 'randomPassword', username: 'user1' })
    await Users.create({ password: 'randomPassword', username: 'user2' })

    await Channels.create({ id: 'xxki900ka', name: 'Public Channel' })

    await UsersChannels.create({ channelId: 'xxki900ka', id: 'xdwqekdf', username: 'user1' })
    await UsersChannels.create({ channelId: 'xxki900ka', id: 'xdwqekdfx', username: 'user2' })
}

app.prepare().then(async () => {
    await connectToDb(sequelize, 'dev')
    const httpServer = createServer(handler)

    await setupDBForDevelopment(sequelize)

    const io = new Server(httpServer, {
        cors: { origin: ['http://localhost:3000'] },
    })

    io.on('connection', (socket) => {
        socket.onAny(() => {
            console.log('got approached')
        })
        socket.on('public-channel:join', async (payload, callback) => {
            console.log('JOINING')
            socket.join('public-channel')

            if (typeof callback !== 'function') return

            return callback({
                status: 'OK',
            })
        })

        socket.on('public-channel:message-sent', async (payload, callback) => {
            console.log({ payload: payload })
            const author = payload.author
            const content = payload.content
            socket.broadcast
                .to('public-channel')
                .emit('public-channel:new-message', { messsage: content, author: author })

            callback({ status: 'OK', data: { author, content } })
        })
    })

    httpServer
        .once('error', (err) => {
            console.error(err)
            process.exit(1)
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`)
        })
})
