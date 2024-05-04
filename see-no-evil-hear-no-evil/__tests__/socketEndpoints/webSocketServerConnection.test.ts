import { Socket } from 'socket.io-client'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { setupSocketTest } from './util'

describe.only('testing that websocket server functions properly', async () => {
    let userSocket: Socket
    let closeSocketServer: () => void
    beforeAll(async () => {
        const { closeIoServer, firstUserSocket } = await setupSocketTest()
        userSocket = firstUserSocket
        closeSocketServer = closeIoServer
    })
    afterAll(async () => {
        closeSocketServer()
    })

    test('connection is established', () => {
        let connected = userSocket.connected
        expect(connected).toBe(true)
    })
})
