'use client'

import { useEffect,useState } from "react"
import {socket} from './socket'

export default function useChat(){
    const [isConnected,setIsConnected] = useState(false)
    const [transport,setTransport] = useState('N/A')

    useEffect(() => {
        if(socket.connected){
            onConnect()
        }

        function onConnect(){
            setIsConnected(true)
            setTransport(socket.io.engine.transport.name)
        }

        function onDisconnect(){
            setIsConnected(false)
            setTransport("N/A")
        }

        socket.on('connect',onConnect)
        socket.on('disconnect',onDisconnect)

        return () => {
            socket.off('connect',onConnect)
            socket.off('disconnect', onDisconnect)
        }
    }, [])

    return {
        isConnected,setIsConnected,
        transport,setTransport
    }
}