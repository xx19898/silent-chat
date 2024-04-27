'use client'
import { io } from 'socket.io-client'

const URL = 'http://localhost:3000'
const socketClient = io(URL, { autoConnect: true })

//Catch-all listener for development
socketClient.onAny((event, ...args) => {
    console.log(event, args)
})

export default socketClient
