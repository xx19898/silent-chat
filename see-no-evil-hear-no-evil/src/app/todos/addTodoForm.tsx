'use client'

import { z } from 'zod'
import { addNewTodo, createTodo } from './actions'
import { revalidatePath } from 'next/cache'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { QueryClient, useQueryClient } from '@tanstack/react-query'

const todoSchema = z.object({
    todo: z.string().min(10, {
        message: 'Todo has to be atleast 10 characters',
    }),
})

interface IOnSubmit {
    todoForm: z.infer<typeof todoSchema>
    queryClient: QueryClient
}

function UseTodoForm() {
    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            todo: '',
        },
    })

    async function onSubmit({ todoForm, queryClient }: IOnSubmit) {
        await createTodo(todoForm.todo)
        //POST todo create

        queryClient.invalidateQueries({ queryKey: ['todos'] })
    }

    return { form, onSubmit }
}

export function TodoForm() {
    const { form, onSubmit } = UseTodoForm()
    const queryClient = useQueryClient()

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(() =>
                    onSubmit({
                        todoForm: form.getValues(),
                        queryClient: queryClient,
                    })
                )}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="todo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Todo</FormLabel>
                            <FormControl>
                                <Input placeholder="Todo" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the point of your todo
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
