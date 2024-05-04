import type { Meta, StoryObj } from '@storybook/react'
import { CancelButton } from './cancelButton'

const meta: Meta<typeof CancelButton> = {
    component: CancelButton,
}

export default meta
type Story = StoryObj<typeof CancelButton>

export const Primary: Story = {
    args: {
        onCancel: () => new Promise((resolve, reject) => console.log('canceled')),
    },
}

export const Secondary: Story = {
    args: {
        ...Primary.args,
    },
}
