import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { getTodos } from "./actions";



export default async function Todos(){
    const todos = await getTodos()

    return(
        <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100">
            <section className="flex min-h-[30vh] overflow-y-scroll flex-col items-center justify-start">
                {
                    todos.map((todo) =>
                        <Card key={todo.id}>
                            <CardContent>
                                <p>{todo.todo}</p>
                            </CardContent>
                        </Card>
                )
                }
            </section>
            <form>
                //TODO: create the form to submit the new todo
            </form>
        </div>
    )
}