import type { Meta, StoryObj } from '@storybook/react'
import { SubmitButton } from './submitButton'

const meta: Meta<typeof SubmitButton> = {
    component: SubmitButton,
}

export default meta
type Story = StoryObj<typeof SubmitButton>

export const Primary: Story = {
    args: {
        onSubmit: () => new Promise((resolve, reject) => console.log('submitted')),
    },
}

export const Secondary: Story = {
    args: {
        ...Primary.args,
    },
}
