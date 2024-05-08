import { UsersDAO } from '@/data-access/chatUsers'
import { Server } from 'socket.io'
import listUsers from './eventHandlers/users/listUsers'
import { MessagesDAO } from '@/data-access/chatMessages'
import { ChannelsDAO } from '@/data-access/chatChannels'
import createChannel from './eventHandlers/channels/createChannel'

interface IInitEventHandlers {
    ioServer: Server
    usersDAO: UsersDAO
    messagesDAO: MessagesDAO
    channelsDAO: ChannelsDAO
}
async function initEventHandlers({ ioServer, usersDAO, channelsDAO, messagesDAO }: IInitEventHandlers) {
    ioServer.on('connection', async (socket) => {
        socket.on('users:list', listUsers({ socket, usersDAO }))

        socket.on('channel:create', createChannel({ channelsDAO: channelsDAO, socket: socket }))
    })
}

export default initEventHandlers
