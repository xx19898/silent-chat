import { v4 as uuidv4 } from 'uuid'

export interface User {
    username: string
    id: string
}

export interface UsersDAO {
    createNewUser: (username: string) => Promise<User[]>
    userExists: (username: string) => Promise<boolean>
    getUsers: () => Promise<User[]>
    getUserById: (id: string) => Promise<User>
    getUserByUsername: (username: string) => Promise<User>
    deleteUserByUsername: (username: string) => Promise<void>
    deleteUserById: () => Promise<void>
}
/*
export const usersPlainDAO: UsersDAO = {
    createNewUser: async function (username: string) {
        const users = await getUsers()
        const newId = uuidv4()
        const updatedUsers: User[] = [
            ...users,
            { username: username, id: newId },
        ]

        await setUsers(updatedUsers)

        return updatedUsers
    },
    getUsers: async function getAllUsers() {
        const users = await getUsers()
        return users
    },
    userExists: async function checkIfUserExists(username: string) {
        const currUsers = await this.getUsers()
        const userWithSameUsername = currUsers.find(
            (user) => user.username === username
        )

        if (userWithSameUsername) return true
        return false
    },
    deleteUserByUsername: async function deleteUser(username: string) {
        const originalUsers = await getUsers()
        const updatedUsers = originalUsers.filter(
            (user) => user.username != username
        )
    }
    getUserById, getUserByUsername, deleteUserById
    getUserById: async function getUserById(id:string){
    }
    ,
}
*/

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

async function getUsers() {
    await mockWait()
    return users
}

async function setUsers(newUsers: User[]) {
    await mockWait()
    users = newUsers
}

async function mockWait() {
    return new Promise((resolve) => setTimeout(resolve, 100))
}
