export interface Message{
    senderId: string,
    receiverId: string,
    content: string,
    chatId: string,
}

export interface Chat{
    id: string,
    members: string[],
}

export interface User{
    username:string,
    id: string,
}

let users: User[] = []



