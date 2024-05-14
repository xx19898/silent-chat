'use server'

import { Button } from '@/components/ui/button'
import EntryPage from '@/visual-components/entry-page/EntryPage'
import EntryPageContainer from './entryPageContainer'

export default async function MainPage() {
    return <EntryPageContainer />
}
