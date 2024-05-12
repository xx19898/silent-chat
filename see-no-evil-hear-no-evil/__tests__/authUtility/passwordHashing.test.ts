import { encryptPassword, passwordIsValid } from "@/auth/authUtility"
import { describe, expect, test } from "vitest"



describe('Testing hashing and comparing passwords', () => {
    
    test('Hashing and comparing passwords', () => {
        const plainPassword = "password"
        const encryptedPassword = encryptPassword(plainPassword)
        
        const wrongPlainPassword = "xxxxxxxxxx3333"
        const wrongResult = passwordIsValid(wrongPlainPassword,encryptedPassword)
        expect(wrongResult).toBe(false)
        const rightResult = passwordIsValid(plainPassword,encryptedPassword)
        expect(rightResult).toBe(true)
    })
})
