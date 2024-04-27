import { TodoForm } from "./addTodoForm";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import TodosList from "./todosList";
import { getCurrentTodos } from "./actions";

export default async function Todos(){
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['todos'],
      queryFn: getCurrentTodos,
    })



    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100">
                <section className="flex min-h-[30vh] overflow-y-scroll flex-col items-center justify-start">
                    <TodosList />
                </section>
                <TodoForm />
        </div>
        </HydrationBoundary>
    )
}