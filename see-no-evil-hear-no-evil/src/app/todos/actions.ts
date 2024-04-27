'use server'

import { v4 as uuidv4 } from 'uuid'
import { Todo, getTodos, setTodos} from './todosData'

export async function getCurrentTodos(){
    console.log('GETTING CURRENT TODOS')
    const currTodos = await getTodos()
    console.log({currTodos})
    return currTodos
}

export async function addNewTodo(newTodo:Todo){
    const currTodos = await getTodos()
    currTodos.push(newTodo)
    setTodos(currTodos)
}

export async function updateTodo(todoToUpdate:Todo){
    if(!todoToUpdate.id) console.log('Id of the todo to update is in incorrect form')

    const currTodos = await getTodos()

    await setTodos(currTodos.map((todo) => {
        if(todo.id != todoToUpdate.id) return todo

        return {
            ...todo,
            ...todoToUpdate
        }
    }))
}

export async function deleteTodo(todoToDelete: Todo){
    const currTodos = await getTodos()

    if(!todoToDelete.id) console.log('Id of the todo to update is in incorrect form')

    await setTodos(currTodos.filter((todo) => todo.id != todoToDelete.id))
}

export async function createTodo(todo:string){
    const currTodos = await getTodos()
    const newId = uuidv4()

    const newTodo:Todo = {
        done:false,
        id:newId,
        todo:todo
    }

    await setTodos([...currTodos,newTodo])

    const updatedTodos = await getTodos()
}