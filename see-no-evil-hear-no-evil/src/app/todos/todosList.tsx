'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getTodos } from "./todosData"
import { Card, CardContent } from "@/components/ui/card"
import { getCurrentTodos } from "./actions"

export default () => {
    const {data,isLoading} = useQuery({
        queryKey: ['todos'],
        queryFn: async function(){
            console.log('getting todos functions gets ran')

            const todos = await getCurrentTodos()
            console.log({todos})
            return todos
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