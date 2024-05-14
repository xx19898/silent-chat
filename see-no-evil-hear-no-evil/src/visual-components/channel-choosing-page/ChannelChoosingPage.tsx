import { Card } from '@/components/ui/card'
import ChannelLink from './ChannelLink'
import { Separator } from '@radix-ui/react-separator'

export interface Channel {
    participants: number
    name: string
}
export interface IPublicChannelChoosingPage {
    channels: Channel[]
}
const PublicChannelChoosingPage = ({ channels }: IPublicChannelChoosingPage) => {
    return(
        <div className='min-h-screen h-auto w-full flex flex-col justify-center items-center bg-gradient-to-b from-gray-800 via-gray-800 to-gray-900 text-white'>
            <h1 className='font-semibold text-3xl py-4'>Channels</h1>
            <Card className='w-[40%] min-h-[60vh] '>
                <ul className='w-full min-h-full h-full px-8 py-4 '>
                    {channels.map((channel, index) => {
                        return (
                            <>
                                {index === 0 ? null : (
                                    <Separator className='w-full px-4 rounded-lg h-[1px] bg-slate-200' />
                                )}
                                <ChannelLink
                                    name={channel.name}
                                    participants={channel.participants}
                                />
                            </>
                        )
                    })}
                </ul>
            </Card>
        </div>
    )
}

export default PublicChannelChoosingPage
