/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaymentGatewayInterface
{
    createRequestPayment(data: Record<string, any>): Promise<unknown>
    verifyPayment(data: Record<string, any>): Promise<unknown>
}