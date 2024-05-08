'use client'
import ChannelChat, { Message } from '@/visual-components/channel-chat/ChannelChat'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

export default function Page({ params }: { params: { slug: string } }) {
    let clientSocket = io('http://localhost:3000')
    const [messages, setMessages] = useState<Message[]>([])
    let [username, setUsername] = useState<string>('')
    useEffect(() => {
        clientSocket.on('connect', () => {
            console.log('CLIENT CONNECTED')
        })
        console.log(`${params.slug}:join`)
        const joinResult = clientSocket.emitWithAck(`${params.slug}:join`)
        console.log({ joinResult })
        clientSocket.on('public-channel:new-message', (data, callback) => {
            const newMessage: Message = { author: data.author, content: data.content }
            setMessages([...messages, newMessage])
        })
        setUsername(`user-${uuidv4()}`)
    }, [])

    async function onSendMessage(newMessage: string) {
        console.log({ newMessage })
        const result = await clientSocket.emitWithAck(`public-chat:message-sent`, {
            content: newMessage,
            author: username,
        })
        console.log({ result })
        if (result.status === 'OK') setMessages([...messages, { author: username, content: newMessage }])
    }

    return (
        <ChannelChat
            messages={messages}
            onSendMessage={onSendMessage}
            ownUsername={username}
        />
    )
}
