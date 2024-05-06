import type { Meta, StoryObj } from '@storybook/react'
import ChannelChat, { IChannelChat, Message } from './ChannelChat'

const meta: Meta<typeof ChannelChat> = {
    component: ChannelChat,
}

export default meta
type Story = StoryObj<typeof ChannelChat>

const primaryArgs: { messages: Message[]; ownUsername: string } = {
    messages: [
        {
            author: 'johny',
            content:
                'Nunc ante elit, pulvinar id odio vel, scelerisque sodales nulla. Phasellus scelerisque sodales lorem eu fermentum. Sed suscipit lacinia nunc, sit amet accumsan metus luctus non. Nam vitae magna odio. Cras condimentum feugiat lorem, ac malesuada sapien suscipit a. Mauris fringilla, risus tristique cursus egestas, lectus eros vestibulum erat, id hendrerit dui sapien quis velit. Aenean in magna purus. Sed tortor ante, molestie at magna a, ultrices pellentesque eros. Nunc elementum mi ac bibendum varius. Aliquam lectus turpis, sagittis vitae arcu quis, fermentum ultrices libero. Donec quis mi odio.',
        },
        {
            author: 'becky',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum ornare turpis, ut semper tellus porttitor at. Pellentesque tincidunt ante eleifend, malesuada orci eu, placerat orci. Praesent ultricies erat at augue ultricies, a rutrum odio luctus. Aliquam semper, odio ut dictum interdum, mauris turpis venenatis sapien, eget porta nibh nisi eu lectus. Aliquam sit amet elementum massa. Proin eros turpis, dictum id fermentum a, volutpat hendrerit felis. Fusce vitae dui leo. Donec luctus luctus ex id interdum. Vestibulum vitae tristique eros, eu fringilla augue. Integer ullamcorper neque in elit varius, id rhoncus turpis luctus. Integer feugiat egestas varius.',
        },
    ],
    ownUsername: 'johny',
}

export const Primary: Story = {
    args: primaryArgs,
}

export const Secondary: Story = {
    args: {
        ...Primary.args,
    },
}
