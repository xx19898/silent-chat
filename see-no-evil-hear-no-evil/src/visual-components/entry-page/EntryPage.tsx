'use client'
import { Button } from '@/components/ui/button'

interface IEntryPage{
    onAnonymousUserLogin: () => Promise<void>,
}

const EntryPage = ({onAnonymousUserLogin}:IEntryPage) => {

    return (
        <div className='w-full min-h-screen h-auto bg-gradient-to-b from-gray-800 via-gray-800 to-gray-900 text-white flex flex-col justify-start items-center gap-[1em]'>
            <h1 className='text-center mt-[10%] text-5xl font-semibold'>Welcome to the chat</h1>
            <h2 className='text-center text-2xl font-semibold'>
                Choose whether to stay anonymous or to be authenticated user :)
            </h2>
            <section className='flex flex-col justify-center items-center gap-[0.5em]'>
                <section className='mt-[1em] flex flex-row justify-center items-center gap-1'>
                    <Button className='w-[10em] py-5 text-white font-semibold rounded-md'>Login</Button>
                    <Button className='w-[10em] py-5 font-semibold rounded-md'>Register</Button>
                </section>
                    <Button onClick={onAnonymousUserLogin} className='px-10 py-5 bg-slate-500 font-semibold rounded-lg'>Stay anonymous</Button>
            </section>
        </div>
    )
}

export default EntryPage
