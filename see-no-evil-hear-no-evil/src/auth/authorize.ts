import { UsersDAO } from "@/data-access/chatUsers";
import { Socket } from "socket.io";
import { parseAuthToken } from "./jwt";

interface IVerifyAndParseToken{
    callback: (args:any) => void
    token: string | undefined
    jwtSecret: string
}

export async function authorize({callback,jwtSecret,token}:IVerifyAndParseToken){
    if(!token) callback({status:'Error',error:'Not authorized'})
    
    const {error,data} = parseAuthToken(token!,jwtSecret)
    
    if(error) callback({status:'Error',error:'Internal authorization error'})
    
    return data
    
}