'use client'

import { useEffect } from "react"
import { useClientSocket } from "../hooks/clientSocket/useClientSocket"
import { BACKEND_URL } from "@/config"
import { io as ioc} from 'socket.io-client'
import EntryPage from "@/visual-components/entry-page/EntryPage"
import { useRouter } from "next/navigation"

const EntryPageContainer = () => {
    const {getClientSocket,setClientSocket} = useClientSocket()
    const router = useRouter()

    useEffect(() => {
        setClientSocket(ioc(`${BACKEND_URL}`))
    },[])

    async function onClickAnonymous(){
        const socket = getClientSocket()
        const result = await socket?.emitWithAck('anonymous:start',{})
        console.log({result})
        router.push('/chat/channels')
    }

    return(
        <EntryPage onAnonymousUserLogin={onClickAnonymous}/>
    )
}

export default EntryPageContainer