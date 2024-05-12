import { createRandomString } from "@/auth/authUtility";
import { createAuthToken } from "@/auth/jwt";
import { UsersDAO } from "@/data-access/chatUsers";

interface IAnonymousLogin{
    usersDAO: UsersDAO
}
interface IAnonymousLoginResponse{
    status: string,
    error?: string,
    data?:{
        role:string,
        username: string,
        token: string
    }
}
export function anonymousLogin({usersDAO}: IAnonymousLogin){
    return async(
        payload: any,
        callback:({status,data,error}:IAnonymousLoginResponse) => void
    ) => {
        const randomStringForUsernameEnding = createRandomString(16)
        let username = 'user-' + randomStringForUsernameEnding
        
        let userWithThatUsernameAlreadyExists = (await usersDAO.userExists({username:username})).userExists

        while(userWithThatUsernameAlreadyExists){
            const randomStringForUsernameEnding = createRandomString(16)
            username = 'user-' + randomStringForUsernameEnding
            userWithThatUsernameAlreadyExists = (await usersDAO.userExists({username:username})).userExists
        }
        
        const randomPassword = createRandomString(32)

        const {error,user} = await usersDAO.createNewUser({password:randomPassword,username:username}) 
        
        if(error){
            callback({status:'Error',error:'Error when creating random user'})
        }

        const jwtSecret = process.env.JWT_SECRET
        if(!jwtSecret) callback({status:'Error',error:'Internal server error'})
        
        const {error:authTokenCreationError,token:authToken} = createAuthToken(user!.username,'anonymousUser',jwtSecret!) 
        if(authTokenCreationError) callback({status:'Error when creating auth token'})

        callback({status:'OK',data:{
            role: 'anonymous_user',
            token:authToken!,
            username: user!.username
        }})
    }
}