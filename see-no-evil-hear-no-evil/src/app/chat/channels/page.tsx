'use server'

import PublicChannelChoosingPage, {
    IPublicChannelChoosingPage,
} from '@/visual-components/channel-choosing-page/ChannelChoosingPage'

const props: IPublicChannelChoosingPage = {
    channels: [
        {
            name: 'First channel',
            participants: 10,
        },
        {
            name: 'Second Channel',
            participants: 20,
        },
    ],
}
export default async function ChannelsPage() {
    return <PublicChannelChoosingPage channels={props.channels} />
}
