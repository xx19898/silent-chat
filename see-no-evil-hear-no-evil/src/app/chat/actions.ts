'use server'

import { v4 as uuidv4 } from 'uuid'
import { User, getUsers, setUsers } from './usersData'
import { Socket } from 'socket.io'

export async function createNewUser(username: string) {
    const users = await getUsers()
    const newId = uuidv4()
    const updatedUsers: User[] = [...users, { username: username, id: newId }]

    await setUsers(updatedUsers)

    return updatedUsers
}

export async function checkIfUserExists(username: string) {
    const currUsers = await getAllUsers()
    const userWithSameUsername = currUsers.find(
        (user) => user.username === username
    )

    if (userWithSameUsername) return true
    return false
}

export async function getAllUsers() {
    const users = await getUsers()
    return users
}

export
