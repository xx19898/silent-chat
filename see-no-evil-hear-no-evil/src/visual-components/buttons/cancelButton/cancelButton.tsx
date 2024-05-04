import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ICancelButton {
    onCancel: () => Promise<void>
}
export const CancelButton = ({ onCancel }: ICancelButton) => {
    return <Button className='rounded-md bg-negative font-semibold text-md'>Cancel</Button>
}
