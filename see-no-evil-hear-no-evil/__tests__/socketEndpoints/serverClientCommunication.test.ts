import { createServer } from 'node:http'
import { type AddressInfo } from 'node:net'
import { io as ioc, type Socket as ClientSocket } from 'socket.io-client'
import { Server, type Socket as ServerSocket } from 'socket.io'
import { assert } from 'chai'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { beforeEach } from 'node:test'
import { IConfig, createNextApp } from '@/webSocketServer/createApp'

function waitFor(socket: ServerSocket | ClientSocket, event: string) {
    return new Promise((resolve) => {
        socket.once(event, resolve)
    })
}

describe('my awesome project', () => {
    let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket

    beforeAll(async (done) => {
        const config: IConfig = {
            cors: {
                origin: ['*'],
            },
            hostname: 'localhost',
            port: 3010,
            serverIsForDevelopment: true,
        }

        const httpServer = await createNextApp({
            serverIsForDevelopment: true,
            cors: config.cors,
            hostname: config.hostname,
            port: config.port,
        })
        console.log({ httpServerAddress: httpServer.address() })
        io = new Server(httpServer, {
            cors: { origin: '*' },
        })
        io.on('connection', async (socket) => {
            serverSocket = socket
            socket.onAny(() => {
                console.log('GOT APPROACHED')
            })
            socket.on('hello', (cb) => {
                cb('world')
            })
        })
        clientSocket = ioc(`http://localhost:${config.port}`)
        clientSocket.on('connect', () => {
            console.log('CLIENT CONNECTED TO THE SERVER')
        })
    })

    afterAll(() => {
        io.close()
        clientSocket.disconnect()
    })

    it('should work', async (done) => {
        const result = await clientSocket.emitWithAck('hello')
        console.log({ result })
        expect(result).toBeDefined()
    })
})
