import { Injectable } from '@nestjs/common'
import { PaymentGatewayInterface } from '../interfaces/payment-gateway-interface.interface'

@Injectable()
export class PaymentZibalService implements PaymentGatewayInterface
{

    constructor()
    {}
    startPay(): Promise<unknown>
    {
        throw new Error('Method not implemented.')
    }
    requestPayment(): Promise<unknown>
    {
        throw new Error('Method not implemented.')
    }
    verifyPayment(): Promise<unknown>
    {
        throw new Error('Method not implemented.')
    }
}