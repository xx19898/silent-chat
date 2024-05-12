import {hashSync,compareSync} from 'bcrypt'

export function passwordIsValid(plainPassword:string,hashedPassword:string){
    const result = compareSync(plainPassword,hashedPassword)
    return result
}

export function encryptPassword(password:string){
    const hashedPassword = hashSync(password,10)
    return hashedPassword
}

export function createRandomString(length:number) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  