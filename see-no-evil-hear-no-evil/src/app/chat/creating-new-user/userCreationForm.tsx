'use client'

import { z } from 'zod'
import { User } from '../usersData'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkIfUserExists, createNewUser } from '../actions'
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
import debounce from 'lodash.debounce'

const userCreatingSchema = z.object({
    username: z
        .string()
        .min(6, {
            message: 'username has to be at least 6 characters',
        })
        .refine(
            debounce(async (username) => {
                const checkResult = await checkIfUserExists(username)

                return !checkResult
            }, 1000),
            {
                message: 'Username already taken',
            }
        ),
})

interface IOnSubmit {
    userCreationForm: z.infer<typeof userCreatingSchema>
}

function UseCreateUserForm() {
    const form = useForm<z.infer<typeof userCreatingSchema>>({
        resolver: zodResolver(userCreatingSchema),
        defaultValues: {
            username: '',
        },
        mode: 'onChange',
    })

    async function onSubmit({ userCreationForm }: IOnSubmit) {
        await createNewUser(userCreationForm.username)

        //emit socket event 'new user creation', get list of updated users
    }

    return { form, onSubmit, formState: form.formState }
}

export function UserCreationForm() {
    const { form, onSubmit, formState } = UseCreateUserForm()
    // Implement a custom validation check for the username via 'user exists' server action

    return (
        <Form {...form}>
            <form>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the name of your user
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    Create
                </Button>
            </form>
        </Form>
    )
}
