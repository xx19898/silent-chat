'use client'
import { useClientSocket } from '@/app/chat/hooks/clientSocket/useClientSocket'
import { Button } from '@/components/ui/button'
import { BACKEND_URL } from '@/config'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { io as ioc} from 'socket.io-client'

const EntryPage = () => {
    const {getClientSocket,setClientSocket} = useClientSocket()

    useEffect(() => {
        setClientSocket(ioc(`${BACKEND_URL}`))
    },[])

    async function onClickAnonymous(){
        const socket = getClientSocket()
        const result = await socket?.emitWithAck('anonymous:start',{})
        console.log({result})
        redirect('/chat/channels')
    }
    
    return (
        <div className='w-full min-h-screen h-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex flex-col justify-start items-center gap-[1em]'>
            <h1 className='text-center mt-[10%] text-5xl font-semibold'>Welcome to the chat</h1>
            <h2 className='text-center text-2xl font-semibold'>
                Choose whether to stay anonymous or to be authenticated user :)
            </h2>
            <section className='flex flex-col justify-center items-center gap-[0.5em]'>
                <section className='mt-[1em] flex flex-row justify-center items-center gap-1'>
                    <Button className='w-[10em] py-5 text-white font-semibold rounded-md'>Login</Button>
                    <Button className='w-[10em] py-5 font-semibold rounded-md'>Register</Button>
                </section>
                    <Button onClick={onClickAnonymous} className='px-10 py-5 bg-slate-500 font-semibold rounded-lg'>Stay anonymous</Button>
            </section>
        </div>
    )
}

export default EntryPage
