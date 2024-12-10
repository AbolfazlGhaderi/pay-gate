/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaymentGatewayInterface
{
    requestPayment(data: Record<string, any>): Promise<unknown>
    verifyPayment(data: Record<string, any>): Promise<unknown>
}