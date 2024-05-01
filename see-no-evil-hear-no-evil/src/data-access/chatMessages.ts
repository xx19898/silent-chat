import { v4 as uuidv4 } from 'uuid'
import { ModelDefined } from 'sequelize'
import { User, getUserDAO } from './chatUsers'
import { MessageAttributes } from './models/Message'
import { UserAttributes } from './models/User'

export interface Message {
    id: string
    content: string
    sender?: User
    receiver?: User
}

//TODO: implement messages just like users
export interface MessagesDAO {
    createNewMessage: ({ content, senderUsername, receiverUsername }: { content: string; senderUsername: string; receiverUsername: string }) => Promise<{ error: undefined; message: Message } | { error: string; message: undefined }>
}

export function getMessagesDAO(Messages: ModelDefined<MessageAttributes, {}>, Users: ModelDefined<UserAttributes, {}>): MessagesDAO {
    const usersDAO = getUserDAO(Users, Messages)
    return {
        createNewMessage: async ({ content, senderUsername, receiverUsername }: { content: string; senderUsername: string; receiverUsername: string }) => {
            const newMessageId = uuidv4()
            try {
                const { userExists: senderExists } = await usersDAO.userExists({ username: senderUsername })
                if (!senderExists) return { error: 'Sender does not exist', message: undefined }
                const { userExists: receiverExists } = await usersDAO.userExists({ username: receiverUsername })
                if (!receiverExists) return { error: 'Receiver does not exist', message: undefined }
                const { dataValues } = await Messages.create({
                    id: newMessageId,
                    senderUsername: senderUsername,
                    receiverUsername: receiverUsername,
                    content: content,
                })
                return { error: undefined, message: { content: dataValues.content, id: dataValues.id } }
            } catch (e) {
                return { error: e as string, message: undefined }
            }
        },
    }
}
