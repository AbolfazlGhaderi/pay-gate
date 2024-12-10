export interface IZarinpalGRequest
{
    merchant_id: string
    amount: string
    description: string
    callback_url: string
    //   "metadata": {"mobile": "09121234567","email": "info.test@gmail.com", "card_pan":"5022291083818920",}
    metadata?: {
        mobile?: string
        email?: string
        card_pan?: string
    }
}