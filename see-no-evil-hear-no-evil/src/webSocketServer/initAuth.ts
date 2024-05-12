import { Server } from "socket.io";

interface IInitAuth{
    ioServer:Server
}

async function initAuth({ioServer}:IInitAuth){
    ioServer.use((socket,next) => {
        const token = socket.handshake.auth.token
        if(!token) next(new Error('Auth token not attached'))
    })
}