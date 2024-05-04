import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ISubmitButton {
    onSubmit: () => Promise<void>
}
export const SubmitButton = ({ onSubmit }: ISubmitButton) => {
    return <Button className='rounded-md bg-positive font-semibold text-md'>Submit</Button>
}
