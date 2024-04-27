'use server'

import { Card } from "@/components/ui/card"
import { UserSearchForm } from "./userSearchForm"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getUsers } from "../chatUsersData"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { getAllUsers } from "../actions"

export default async function UsersSearch(){
    //TODO: continue creating this, add suspense to the insides of the card
    // inside the card there should be input field and a list for listing out all the users
    // receive the list of all the users with web socket to keep it in the real time
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['chat','users'],
        queryFn: getAllUsers,
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="w-auto min-h-screen flex flex-col justify-center items-center">
            <Card className="py-10 px-5 flex flex-col justify-center items-center gap-4">
                    <UserSearchForm onChange={(username:string) => console.log({username})}/>
            </Card>
        </div>
        </HydrationBoundary>
    )
}