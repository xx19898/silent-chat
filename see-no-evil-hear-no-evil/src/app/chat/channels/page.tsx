'use server'

import PublicChannelChoosingPage from '@/visual-components/channel-choosing-page/ChannelChoosingPage'
import { getChannelsInfo } from '../actions/channelActions'
import { getUsers, users } from '../usersData'



export default async function ChannelChoosingContainer() {
    const channelInfo = await getChannelsInfo()

    return <PublicChannelChoosingPage channels={undefined} />
}
