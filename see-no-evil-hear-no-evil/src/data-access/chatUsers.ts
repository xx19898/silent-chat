import { v4 as uuidv4 } from 'uuid'
import { Message } from './chatMessages'
import { Users } from '@/utility/sequelize'
import { Model, ModelDefined } from 'sequelize'
import { UserAttributes } from './models/User'
import { MessageAttributes } from './models/Message'

export interface User {
    username: string
    password: string
    receiver?: Message[]
    sender?: Message[]
}

export interface UsersDAO {
    createNewUser: ({ username, password }: { username: string; password: string }) => Promise<
        | {
              user: User
              error: undefined
          }
        | {
              user: undefined
              error: string
          }
    >
    userExists: ({ username }: { username: string }) => Promise<
        | {
              userExists: boolean
              error: undefined
          }
        | {
              userExists: undefined
              error: string
          }
    >
    getUsers: () => Promise<
        | {
              users: User[]
              error: undefined
          }
        | {
              users: undefined
              error: string
          }
    >

    getUserByUsername: ({ targetUsername }: { targetUsername: string }) => Promise<
        | {
              user: User
              error: undefined
          }
        | {
              user: undefined
              error: string
          }
    >
    deleteUserByUsername: ({ username }: { username: string }) => Promise<
        | {
              error: undefined
          }
        | {
              error: string
          }
    >
}

export function getUserDAO(
    Users: ModelDefined<UserAttributes, {}>,
    Messages: ModelDefined<MessageAttributes, {}>
): UsersDAO {
    const usersDAO: UsersDAO = {
        createNewUser: async function ({ username, password }: { username: string; password: string }) {
            const newId = uuidv4()
            try {
                const newUser = await Users.create({
                    username: username,
                    password: password,
                    id: newId,
                })
                const newUserDataValues = newUser.dataValues

                return {
                    user: {
                        password: newUserDataValues.password,
                        username: newUserDataValues.username,
                        id: newUserDataValues.id,
                    },
                }
            } catch (e) {
                return {
                    error: e as string,
                }
            }
        },
        getUsers: async function () {
            try {
                const allUsers = await Users.findAll({
                    where: {},
                })
                const users: User[] = allUsers.map(({ dataValues }: Model<UserAttributes, {}>) => {
                    return {
                        password: dataValues.password,
                        username: dataValues.username,
                    }
                })
                return {
                    users,
                    error: undefined,
                }
            } catch (e) {
                return {
                    error: e as string,
                    users: undefined,
                }
            }
        },
        userExists: async function ({ username }: { username: string }) {
            try {
                const soughtUser = await Users.findOne({
                    where: {
                        username: username,
                    },
                })
                return {
                    error: undefined,
                    userExists: soughtUser !== null,
                }
            } catch (e) {
                return {
                    user: undefined,
                    error: e as string,
                }
            }
        },
        deleteUserByUsername: async function ({ username }: { username: string }) {
            try {
                await Users.destroy({
                    where: {
                        username: username,
                    },
                })
                return {
                    error: undefined,
                }
            } catch (e) {
                return {
                    error: e as string,
                }
            }
        },
        getUserByUsername: async function ({ targetUsername }: { targetUsername: string }) {
            try {
                const user = await Users.findOne({
                    where: {
                        username: targetUsername,
                    },
                    include: [
                        {
                            as: 'author',
                            model: Messages,
                        },
                    ],
                })

                if (user === null) return { user: undefined, error: 'User not found' }

                return { error: undefined, user: { ...user.dataValues } }
            } catch (e) {
                return { error: e as string, user: undefined }
            }
        },
    }
    return usersDAO
}

export async function mockWait() {
    return new Promise((resolve) => setTimeout(resolve, 100))
}
