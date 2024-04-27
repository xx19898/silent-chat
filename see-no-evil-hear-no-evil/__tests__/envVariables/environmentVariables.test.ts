import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable'
import { expect, test, describe } from 'vitest'

describe('Environment variables load', () => {
    test('loading environment variables', () => {
        loadEnvVariables('./dev.env')
        const dbUser = process.env.POSTGRESDB_USER
        expect(dbUser).toBe('database_user')
    })
})
