import { atom } from "jotai"
import { z } from "zod"

const userInfoScheme = z.object({
    username: z.string(),
    authToken: z.string(),
    role: z.string()
})

export type IUserInfo = z.infer<typeof userInfoScheme>

export const userInfoAtom = atom<IUserInfo | undefined>(undefined)
