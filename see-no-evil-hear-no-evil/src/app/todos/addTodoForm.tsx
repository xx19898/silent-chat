import { zodResolver } from "@hooktodo/resolvers/zod"
import { usetodo } from "react-hook-todo"
import { z } from "zod"
import { addNewTodo } from "./actions"
import { revalidatePath } from "next/cache"


const todoSchema = z.object({
        todo: z.string().min(10, {
            message: "Todo has to be atleast 10 characters",
        }),
  })

  export function Todotodo() {
    // 1. Define your todo.
    const todo = usetodo<z.infer<typeof todoSchema>>({
      resolver: zodResolver(todoSchema),
      defaultValues: {
        todo: "",
      },
    })

    // 2. Define a submit handler.
    function onSubmit({todo}: z.infer<typeof todoSchema>) {
        addNewTodo({todo:todo, done:false, id:''})
        revalidatePath('/todos')
    }
  }