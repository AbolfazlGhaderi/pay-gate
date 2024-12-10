/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/await-thenable */
import { Get, HttpException, Injectable, Logger } from '@nestjs/common'
import { PaymentGatewayInterface } from '../interfaces/payment-gateway-interface.interface'
import { ZarinpalGRequestInterface } from '../interfaces/zarinpal-gateway.interface'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom, lastValueFrom, map, throwError } from 'rxjs'

@Injectable()
export class PaymentZarinpalService implements PaymentGatewayInterface
{
    logger: Logger = new Logger(PaymentZarinpalService.name)
    constructor(
        private readonly httpService: HttpService,
    )
    {}

    startPay(): Promise<unknown>
    {
        throw new Error('Method not implemented.')
    }


    async requestPayment(data: ZarinpalGRequestInterface): Promise<unknown>
    {
        const result = await  lastValueFrom(
            this.httpService.post(process.env.ZARINPAL_REQUEST_PAYMENT_URL, data, {})
                .pipe(map((response) => response.data))
                .pipe(catchError((error) =>
                {
                    this.logger.error(error)
                    throw new HttpException('zarinpal not available', 503)
                })),
        )

        const { code, authority } = result.data

        if (code === 100 && authority)
        {
            return {
                code,
                authority,
                startPaymentUrl: `${process.env.ZARINPAL_START_PAYMENT_URL}/${authority}`,
            }
        }
    }

    async verifyPayment(): Promise<unknown>
    {
        throw new Error('Method not implemented.')
    }

    async callback(): Promise<unknown>
    {
        throw new Error('Method not implemented.')
    }
}