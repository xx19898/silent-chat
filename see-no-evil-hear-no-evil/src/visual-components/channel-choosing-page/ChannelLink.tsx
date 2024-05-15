import Link from 'next/link'
import { PersonIcon } from './personSvg'

interface IChannelLink {
    participants: number
    name: string
    id: string
}

const ChannelLink = ({ name, participants,id }: IChannelLink) => {
    return (
        <li
            key={name}
            className='w-full my-3'>
            <Link
                href={`/chat/channels/${id}`}
                className='w-full'>
                <div className='w-full shadow-md  px-[10%] rounded-md py-2 flex flex-row justify-between items-center'>
                    <p className='text-lg font-medium'>{name}</p>
                    <section className='flex flex-row justify-center items-center gap-1'>
                        <PersonIcon />
                        <p>{participants}</p>
                    </section>
                </div>
            </Link>
        </li>
    )
}

export default ChannelLink
