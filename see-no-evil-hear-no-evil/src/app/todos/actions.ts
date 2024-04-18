import { v4 as uuidv4 } from 'uuid'

'use server'

export interface Todo{
    id: string,
    todo: string,
    done: boolean,
}

export let todos: Todo[] = [{
    done:false,
    id: 'xxd',
    todo: 'learn nextjs14'
}]

export async function getTodos(){
    console.log('GET TODOS EXECUTED')
    return todos
}

export async function addNewTodo(newTodo:Todo){
    todos.push(newTodo)
}

export async function updateTodo(todoToUpdate:Todo){
    if(!todoToUpdate.id) console.log('Id of the todo to update is in incorrect form')

    todos = todos.map((todo) => {
        if(todo.id != todoToUpdate.id) return todo

        return {...todo,...todoToUpdate}
    })
}

export async function deleteTodo(todoToDelete: Todo){
    if(!todoToDelete.id) console.log('Id of the todo to update is in incorrect form')

    todos = todos.filter((todo) => todo.id != todoToDelete.id)
}

async function createTodo(todo:string){

    const newId = uuidv4()

    const newTodo:Todo = {
        done:false,
        id:newId,
        todo:todo
    }
}