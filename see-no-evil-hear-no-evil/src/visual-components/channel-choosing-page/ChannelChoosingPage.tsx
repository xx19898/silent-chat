import { Card } from '@/components/ui/card'
import ChannelLink from './ChannelLink'
import { Separator } from '@radix-ui/react-separator'

export interface ChannelInfo{
    userCount: number
    channelName: string
    id: string
}
export interface IPublicChannelChoosingPage{
    channels: ChannelInfo[] | undefined
}

const PublicChannelChoosingPage = ({ channels }: IPublicChannelChoosingPage) => {
    return(
        <div className='min-h-screen h-auto w-full flex flex-col justify-center items-center bg-gradient-to-b from-gray-800 via-gray-800 to-gray-900 text-white'>
            <h1 className='font-semibold text-3xl py-4'>Channels</h1>
            <Card className='w-[40%] min-h-[60vh] '>
                <ul className='w-full min-h-full h-full px-8 py-4 '>
                    {
                    !channels ? <div>Sorry, no channels here yet</div>
                    :
                    channels.map((channel, index) => {
                        return (
                            <>
                                {index === 0 ? null : (
                                    <Separator className='w-full px-4 rounded-lg h-[1px] bg-slate-200' />
                                )}
                                <ChannelLink
                                    id={channel.id}
                                    name={channel.channelName}
                                    participants={channel.userCount}
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
