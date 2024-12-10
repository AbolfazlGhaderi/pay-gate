/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/await-thenable */
import { HttpException, Injectable, Logger } from '@nestjs/common'
import { PaymentGatewayInterface } from '../interfaces/payment-gateway-interface.interface'
import { ZarinpalGRequestInterface } from '../interfaces/zarinpal-gateway.interface'
import { HttpService } from '@nestjs/axios'
import { catchError, lastValueFrom, map } from 'rxjs'

@Injectable()
export class ZarinpalPService implements PaymentGatewayInterface
{
    logger: Logger = new Logger(ZarinpalPService.name)
    constructor(
        private readonly httpService: HttpService,
    )
    {}

    async requestPayment(data: ZarinpalGRequestInterface): Promise<unknown>
    {
        const result = await lastValueFrom(
            this.httpService.post(process.env.ZARINPAL_REQUEST_PAYMENT_URL, data, {})
                .pipe(map((response) => response.data))
                .pipe(catchError((error) =>
                {
                    this.logger.error(error)
                    throw new HttpException('zarinpal unavailable', 503)
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
        this.logger.verbose(`connection fail in the zarinpal | Result : ${JSON.stringify(result)}`)
        throw new HttpException('connection fail in the zarinpal', 400)
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