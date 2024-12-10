export interface IZibalGRequest
{
    merchant: string
    amount: string
    description: string
    callbackUrl: string
    mobile?: string
    allowedCards?: string[]
    nationalCode?: string
    checkMobileWithCard?: boolean
}