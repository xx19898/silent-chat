import { createAuthToken, parseAuthToken } from "@/auth/jwt"
import { loadEnvVariables } from "@/utility/loadingEnvironmentVariable"
import { describe, expect, test } from "vitest"

describe('Testing creating and parsing jwt tokens', () => {
    
    loadEnvVariables('./test.env')
    
    test('Creating and parsing jwt token works', async () => {
        const testSecret = 'testSecret'
        const token = createAuthToken('testUser','user',testSecret)
        const result = parseAuthToken(token,testSecret)
        expect(result.data).toBeDefined()
        expect(result.data?.data.username).toBe('testUser')
    })
})
