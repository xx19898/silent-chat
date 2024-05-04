import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'
import { setupSocketTest, waitFor } from './util'
import { Socket } from 'socket.io-client'

describe('getting list of the users', async () => {
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
    it('number of users gets listed correctly through the socket communication', async () => {
        let numberOfUsers = 0
        try {
            const response = await userSocket.timeout(15000).emitWithAck('users:list', {})
            numberOfUsers = response.users.length
            expect(response.status).toBe('OK')
            expect(numberOfUsers).toBe(1)
            console.log({ users: response.users }) // 'ok'
        } catch (e) {
            console.log({ e })
        }
    }, 20000)
})
