'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getTodos } from "./todosData"
import { Card, CardContent } from "@/components/ui/card"
import { getCurrentTodos } from "./actions"

export default function TodosList(){
    const {data,isLoading} = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const currentTodos = await getCurrentTodos()

            return currentTodos
        }
    })

    console.log({data})

    if(isLoading || !data) return <h1>Please wait</h1>

    return data.map((todo) =>
        <Card key={todo.id}>
            <CardContent>
                <p className="">{todo.todo}</p>
            </CardContent>
        </Card>
        )
}