import { UsersDAO } from '@/data-access/chatUsers'
import { Server } from 'socket.io'
import listUsers from './eventHandlers/listUsers'

interface IInitEventHandlers {
    ioServer: Server
    usersDAO: UsersDAO
}
async function initEventHandlers({ ioServer, usersDAO }: IInitEventHandlers) {
    ioServer.on('connection', async (socket) => {
        socket.onAny(() => {
            console.log('GOT APPROACHED')
        })
        socket.on('users:list', listUsers({ socket, usersDAO }))
    })
}

export default initEventHandlers
