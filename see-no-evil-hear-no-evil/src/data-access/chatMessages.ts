import { v4 as uuidv4 } from 'uuid'
import { ModelDefined } from 'sequelize'
import { User, getUserDAO } from './chatUsers'
import Message, { MessageAttributes } from './models/Message'
import { UserAttributes } from './models/User'

export interface Message {
    id: string
    content: string
    author?: string
    channelId?: string
}

//TODO: implement messages just like users
export interface MessagesDAO {
    createNewMessage: ({
        content,
        authorUsername,
        channelId,
    }: {
        content: string
        authorUsername: string
        channelId: string
    }) => Promise<{ error: undefined; message: Message } | { error: string; message: undefined }>
}

export function getMessagesDAO(
    Messages: ModelDefined<MessageAttributes, {}>,
    Users: ModelDefined<UserAttributes, {}>
): MessagesDAO {
    const usersDAO = getUserDAO(Users, Messages)
    return {
        createNewMessage: async ({
            content,
            authorUsername,
            channelId,
        }: {
            content: string
            authorUsername: string
            channelId: string
        }) => {
            const newMessageId = uuidv4()
            try {
                const { userExists: authorExists } = await usersDAO.userExists({ username: authorUsername })
                if (!authorExists) return { error: `Author ${authorUsername} does not exist`, message: undefined }
                const { dataValues } = await Messages.create({
                    id: newMessageId,
                    author: authorUsername,
                    content: content,
                    channelId: channelId,
                })
                return {
                    error: undefined,
                    message: {
                        content: dataValues.content,
                        id: dataValues.id,
                        author: authorUsername,
                        channelId: dataValues.channelId,
                    },
                }
            } catch (e) {
                return { error: e as string, message: undefined }
            }
        },
    }
}
