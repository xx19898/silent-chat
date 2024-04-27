import { config } from 'dotenv'

export function loadEnvVariables(envFilePath: string) {
    config({ path: envFilePath })
}
