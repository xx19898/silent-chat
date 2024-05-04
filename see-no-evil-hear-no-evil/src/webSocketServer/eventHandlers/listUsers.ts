import { UsersDAO } from '@/data-access/chatUsers'
import { Socket } from 'socket.io'

interface IListUsers {
    socket: Socket
    usersDAO: UsersDAO
}
function listUsers({ socket, usersDAO }: IListUsers) {
    return async (query, callback) => {
        const { users, error } = await usersDAO.getUsers()
        callback({
            status: 'OK',
            users,
        })
    }
}

export default listUsers
