import { Card } from '@/components/ui/card'
import ChannelChatMessage, { IChannelChatMessage } from './ChannelChatMessage'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@radix-ui/react-separator'

export interface IChannelChat {
    messages: Message[]
    ownUsername: string
}

export interface Message {
    content: string
    author: string
}

const ChannelChat = ({ messages, ownUsername }: IChannelChat) => {
    return (
        <div className='w-full min-h-screen h-auto flex flex-col justify-center items-center'>
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
                <Textarea className='w-[80%]  mx-auto my-5 py-4' />
            </Card>
        </div>
    )
}

export default ChannelChat
