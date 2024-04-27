import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

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
