import { UsersDAO } from '@/data-access/chatUsers'
import { Server } from 'socket.io'
import listUsers from './eventHandlers/users/listUsers'
import { MessagesDAO } from '@/data-access/chatMessages'
import { ChannelsDAO } from '@/data-access/chatChannels'
import createChannel from './eventHandlers/channels/createChannel'
import { anonymousLogin } from './eventHandlers/auth/anonymousLogin'
import { sendMessage } from './eventHandlers/messages/sendMessage'
import { listChannels } from './eventHandlers/channels/listChannel'
import { joinChannel } from './eventHandlers/channels/joinChannel'

interface IInitEventHandlers {
    ioServer: Server
    usersDAO: UsersDAO
    messagesDAO: MessagesDAO
    channelsDAO: ChannelsDAO
}
async function initEventHandlers({ ioServer, usersDAO, channelsDAO, messagesDAO }: IInitEventHandlers) {
    ioServer.on('connection', async (socket) => {
        socket.on('users:list', listUsers({ socket, usersDAO }))
        
        socket.on('channels:create', createChannel({ 
            channelsDAO: channelsDAO,
            socket: socket 
        }))

        socket.on('channels:join', joinChannel({
            channelsDAO: channelsDAO,
            socket:socket,
        }))

        socket.on('channels:list',listChannels({channelsDAO:channelsDAO}))

        socket.on('messages:send', sendMessage({
            channelsDAO:channelsDAO,
            messagesDAO:messagesDAO,
            socket:socket,
            usersDAO:usersDAO}))

        socket.on('anonymous:start', anonymousLogin({
            usersDAO:usersDAO
        }))
    })
}

export default initEventHandlers
