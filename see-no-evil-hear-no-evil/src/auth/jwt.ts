import jwt from 'jsonwebtoken'
import { z } from 'zod';

export interface IAuthToken{
    username:string,
    role:string,
}

const decodedData = z.object({
    data: z.object({
        username:z.string(),
        role:z.string(),
    }),
    exp: z.number(),
    iat: z.number()
})

export function createAuthToken(username:string,role:string,jwtSecret:string){
    try{
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: {
                username:username,
                role: role,
            }
          }, jwtSecret);
        return {token:token,error:undefined}
    }catch(e){
        return {token:undefined,error:'Error when creating auth token'}
    }
}

export function parseAuthToken(token:string,jwtSecret:string){
    try{
        const data = jwt.verify(token,jwtSecret)
        const parsedData = decodedData.parse(data)
        return {data:parsedData,error:undefined}
    }catch(e){
        return {error: e as string}
    }
}