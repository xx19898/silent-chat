'use client'

import { useAtom } from "jotai"
import { socketAtom } from "./socketAtom"
import { Socket } from "socket.io-client"

export function useClientSocket(){
    const [atom,setAtom] = useAtom(socketAtom)

    function getClientSocket(){
        return atom
    }

    function setClientSocket(newClientSocket:Socket){
        setAtom(newClientSocket)
        return atom
    }

    return {
        getClientSocket,
        setClientSocket
    }
}