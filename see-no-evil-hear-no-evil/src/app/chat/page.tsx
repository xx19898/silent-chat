'use client'

import useChat from "./useChat"

export default function Chat(){
    const {
        isConnected,
        setIsConnected,
        transport,
        setTransport
    } = useChat()

    return(
        <div className="min-h-screen w-auto flex flex-col justify-center items-center">

        </div>
    )
}