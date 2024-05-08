import { Socket } from 'socket.io-client'
import { beforeAll } from 'vitest'
import { setupSocketTest } from '../util'

//TODO: test joining channel and then receiving notification from the channel

/*
describe('joining channel and then receiving notification from the channel',async () => {
    let userSocket: Socket
    let closeSocketServer: () => void

    beforeAll(async () => {
        const {closeIoServer, firstUserSocket} = await setupSocketTest()
        userSocket = firstUserSocket
    })
})
*/
