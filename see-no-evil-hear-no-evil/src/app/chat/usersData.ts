export interface Message {
    senderId: string
    receiverId: string
    content: string
    chatId: string
}

export interface Chat {
    id: string
    members: string[]
}

export interface User {
    username: string
    id: string
}

export let users: string[] = ['user']

export function setUsers(newUsers:string[]){
    users = newUsers
}

export function getUsers(){
    return users
}
    
