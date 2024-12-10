import { EnvVariables } from '@/common/interfaces/env.variables.interface'

/* eslint-disable unicorn/prevent-abbreviations */

export const envTemplate: EnvVariables = {
    PORT: '',
    MONGO_URI:'',
    MAIL_HOST:'',
    MAIL_PORT:'',
    MAIL_USER:'',
    MAIL_PASSWORD:'',
    MAIL_FROM:'',
    ZARINPAL_MERCHANT_ID: '',
    ZARINPAL_REQUEST_PAYMENT_URL: '',
    ZARINPAL_VERIFY_PAYMENT_URL: '',
    ZARINPAL_START_PAYMENT_URL: '',
    ZIBAL_MERCHANT_ID: '',
    ZIBAL_REQUEST_PAYMENT_URL: '',
    ZIBAL_VERIFY_PAYMENT_URL: '',
    ZIBAL_START_PAYMENT_URL: '',
}

export function CheckEnvironmentVariables()
{
    const missingEnvVariables = Object.keys(envTemplate).filter(variable => !process.env[variable] || process.env[variable] === '')
    if (missingEnvVariables.length > 0)
    {
        // process.stderr.write(`\u001B[31mMissing environment variables: < ${missingEnvVariables.join(' >, < ')} >\u001B[0m\n`);
        const ErrorMessage = `\u001B[31mMissing environment variables: < ${missingEnvVariables.join(' >, < ')} >\u001B[0m\n`
        throw new Error(ErrorMessage)
    }
}