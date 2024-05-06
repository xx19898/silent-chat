import { PersonIcon } from '../channel-choosing-page/personSvg'

export interface IChannelChatMessage {
    author: string
    content: string
    ownComment: boolean
}

const ChannelChatMessage = ({ ownComment, author, content }: IChannelChatMessage) => {
    if (ownComment)
        return (
            <li className='w-full flex flex-row justify-end items-center text-white font-normal text-md'>
                <div className='w-[80%] mr-1 flex flex-row justify-end rounded-md shadow-md items-center bg-slate-400'>
                    <p className='w-full px-6 py-4 text-left indent-2'>{content}</p>
                </div>
            </li>
        )
    return (
        <li className='w-full flex flex-col  justify-center items-start font-normal text-md '>
            <div className='w-[80%] ml-1 flex flex-row justify-start items-end gap-1'>
                <section className='flex flex-col justify-center items-center gap-1 bg-slate-300 p-3 rounded-[50%]'>
                    <PersonIcon />
                    <p>{author}</p>
                </section>
                <p className='w-full py-8 shadow-md rounded-md text-left indent-2 px-4 bg-slate-100'>{content}</p>
            </div>
        </li>
    )
}

export default ChannelChatMessage
