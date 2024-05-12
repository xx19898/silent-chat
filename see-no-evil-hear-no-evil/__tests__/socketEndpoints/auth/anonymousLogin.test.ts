import { UsersDAO } from "@/data-access/chatUsers"
import { Sequelize } from "sequelize"
import { Socket } from "socket.io-client"
import { beforeAll, describe, expect, test } from "vitest"
import { setupSocketTest } from "../util"
import { deleteAllRowsOnAllTables } from "../../databaseTestUtility"


describe('starting to use chat as anonymous user', async () => {
    let userSocket: Socket
    let closeSocketServer: () => void
    let usersDAO: UsersDAO
    let sequelize:Sequelize

    beforeAll(async () => {
        const {closeIoServer, firstUserSocket, channelsDAO: theChannelsDao,sequelize:currSequelize,usersDAO: theUsersDAO } = await setupSocketTest()
        usersDAO = theUsersDAO
        userSocket = firstUserSocket
        closeSocketServer = closeIoServer
        sequelize = currSequelize
        await deleteAllRowsOnAllTables(sequelize)
    })

    test('client can login as an anonymous user',async () => {
        const response = await userSocket.emitWithAck('anonymous:start',{})
        console.log({response})

        expect(response.status).toBe('OK')
        expect(response.data.username).toBeDefined()
    })
})