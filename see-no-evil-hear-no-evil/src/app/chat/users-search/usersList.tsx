'use server'

import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../actions"
import { Skeleton } from "@/components/ui/skeleton"


export function useChatUsers(){
    const {data,isFetched} = useQuery({
        queryKey:['chat','users'],
        queryFn: getAllUsers
    })

    return {users:data,usersFetched: isFetched}
}


export default async function UsersList(){
    const {users,usersFetched} = useChatUsers()

    if(!usersFetched || !users) return <Skeleton />

    return(
        <ul>
            {
                users.map(
                    ({username}) => <li key="username">{username}</li>
                )
            }
        </ul>
    )
}