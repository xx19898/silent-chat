import { connectToDb } from '@/utility/databaseConnection'
import { loadEnvVariables } from '@/utility/loadingEnvironmentVariable'
import { describe, expect, test } from 'vitest'

describe('Connecting to the database', () => {
    test('connecting to the database', async () => {
        loadEnvVariables('./dev.env')
        const { error } = await connectToDb('test')
        expect(error).toBeUndefined()
    })
})
