

export interface Todo{
    id: string,
    todo: string,
    done: boolean,
}

let todos: Todo[] = [{
    done:false,
    id: 'xxd',
    todo: 'learn nextjs14'
}]

function mockWait(){
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
    },500)
    })
}

export async function setTodos(newTodos:Todo[]){
    await mockWait()
    todos = newTodos
}

export async function getTodos(){
    await mockWait()
    return todos
}