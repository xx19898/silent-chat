'use client'
import { Card } from '@/components/ui/card'
import ChannelChatMessage, { IChannelChatMessage } from './ChannelChatMessage'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@radix-ui/react-separator'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export interface IChannelChat {
    messages: Message[]
    ownUsername: string
    onSendMessage: (author: string, message: string) => void
}

export interface Message {
    content: string
    author: string
}

const ChannelChat = ({ messages, ownUsername, onSendMessage }: IChannelChat) => {
    const [messageContent, setMessageContent] = useState('')
    return (
        <div className='w-full min-h-screen h-auto flex flex-col justify-center items-center'>
            <h1>{ownUsername}</h1>
            <Card className='min-w-[40%] min-h-[40vh] h-auto'>
                <ul className='relative min-h-[20vh] w-full flex flex-col gap-2 py-8 justify-center items-center'>
                    {messages.map(({ author, content }, index) => {
                        return (
                            <ChannelChatMessage
                                author={author}
                                content={content}
                                ownComment={author == ownUsername}
                            />
                        )
                    })}
                </ul>
                <Separator className='rounded-lg bg-slate-300 w-[98%] h-1 mx-auto' />
                <Textarea
                    onChange={(e) => setMessageContent(e.target.value)}
                    className='w-[80%]  mx-auto my-5 py-4'
                />
                <Button
                    className='px-4 py-2'
                    onClick={() => onSendMessage(ownUsername, messageContent)}>
                    Send Message
                </Button>
            </Card>
        </div>
    )
}

export default ChannelChat
