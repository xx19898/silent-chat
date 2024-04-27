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

let users: User[] = [
    {
        username: 'user1111',
        id: 'xddasqwer',
    },
    {
        username: 'user2222',
        id: 'xdffaqwe',
    },
    {
        username: 'user3333',
        id: 'sdfsdsfsfdsfsfsffssfd',
    },
]
