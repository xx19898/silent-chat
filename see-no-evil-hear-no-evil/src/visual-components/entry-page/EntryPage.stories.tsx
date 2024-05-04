import type { Meta, StoryObj } from '@storybook/react'
import EntryPage from './EntryPage'

const meta: Meta<typeof EntryPage> = {
    component: EntryPage,
}

export default meta
type Story = StoryObj<typeof EntryPage>

export const Primary: Story = {
    args: {},
}

export const Secondary: Story = {
    args: {
        ...Primary.args,
    },
}
