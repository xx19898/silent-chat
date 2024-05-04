import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()
/*
loadEnvVariables('./dev.env')
const connectionString = `postgres://${process.env.POSTGRESDB_USER}:${process.env.POSTGRESDB_ROOT_PASSWORD}@${'postgres-test'}:${5433}/${process.env.POSTGRESDB_DATABASE}`
const sequelize = new Sequelize(connectionString)
*/
app.prepare().then(() => {
    const httpServer = createServer(handler)

    const io = new Server(httpServer, {
        cors: { origin: ['http://localhost:3000'] },
    })

    io.on('connection', (socket) => {
        console.log('CONNECTED ON SERVER SIDE')
    })

    //create initeventhandlers function which passes in io to eventhandlers and initialises them

    httpServer
        .once('error', (err) => {
            console.error(err)
            process.exit(1)
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`)
        })
})
