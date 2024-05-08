import { User, UsersDAO } from '@/data-access/chatUsers'
import { Socket } from 'socket.io'

interface IListUsers {
    socket: Socket
    usersDAO: UsersDAO
}
function listUsers({ socket, usersDAO }: IListUsers) {
    return async (callback: ({ status, users }: { status: string; users: User[] | undefined }) => void) => {
        const { users, error } = await usersDAO.getUsers()

        if (!users) callback({ status: 'NOT OK', users: undefined })

        callback({
            status: 'OK',
            users,
        })
    }
}

export default listUsers
