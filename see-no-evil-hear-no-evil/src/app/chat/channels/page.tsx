'use server'

import PublicChannelChoosingPage, {
    IPublicChannelChoosingPage,
} from '@/visual-components/channel-choosing-page/ChannelChoosingPage'

const props: IPublicChannelChoosingPage = {
    channels: [
        {
            name: 'public-channel',
            participants: 0,
        },
    ],
}

export default async function ChannelChoosingContainer() {
    return <PublicChannelChoosingPage channels={props.channels} />
}
