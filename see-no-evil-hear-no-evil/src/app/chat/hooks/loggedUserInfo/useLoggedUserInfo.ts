'use client'

import { useAtom } from "jotai"
import { IUserInfo, userInfoAtom } from "./userInfo"

export function useLoggedUserInfo(){
    const [userInfo,setuserInfo] = useAtom(userInfoAtom)

    function getUserInfo(){
        return userInfo
    }

    function setUserInfo(updatedUserInfo:IUserInfo){
        setuserInfo(updatedUserInfo)
        return userInfo
    }

    return {
        getUserInfo,
        setUserInfo
    }
}