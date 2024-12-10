/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaymentGatewayInterface
{
    startPay(data: Record<string, any>): Promise<unknown>
    requestPayment(data: Record<string, any>): Promise<unknown>
    verifyPayment(data: Record<string, any>): Promise<unknown>
}