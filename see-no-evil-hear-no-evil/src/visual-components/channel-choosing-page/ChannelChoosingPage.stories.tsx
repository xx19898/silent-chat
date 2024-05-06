import type { Meta, StoryObj } from '@storybook/react'
import PublicChannelChoosingPage, { IPublicChannelChoosingPage } from './ChannelChoosingPage'

const meta: Meta<typeof PublicChannelChoosingPage> = {
    component: PublicChannelChoosingPage,
}

export default meta
type Story = StoryObj<typeof PublicChannelChoosingPage>

const primaryArgs: IPublicChannelChoosingPage = {
    channels: [
        {
            name: 'First Channel',
            participants: 1983,
        },
        {
            name: 'Second Channel',
            participants: 2000,
        },
    ],
}

export const Primary: Story = {
    args: primaryArgs,
}

export const Secondary: Story = {
    args: {
        ...Primary.args,
    },
}
