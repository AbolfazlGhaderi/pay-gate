import { HttpException, Injectable, Logger } from '@nestjs/common'
import { PaymentGatewayInterface } from '../interfaces/payment-gateway-interface.interface'
import { HttpService } from '@nestjs/axios'
import { catchError, lastValueFrom, map } from 'rxjs'
import { IZibalGRequest } from '../interfaces/zibal-gateway.interface'

@Injectable()
export class ZibalPService implements PaymentGatewayInterface
{
    logger: Logger = new Logger(ZibalPService.name)

    constructor(
        private readonly httpService: HttpService,
    )
    {}

    async createRequestPayment(data: IZibalGRequest): Promise<unknown>
    {
        data = JSON.parse(JSON.stringify(data))

        const responseFromRequestPaymentUrl = await lastValueFrom(
            this.httpService.post(process.env.ZIBAL_REQUEST_PAYMENT_URL, data, {})
                .pipe(map((response) => response.data))
                .pipe(catchError((error) =>
                {
                    this.logger.error(error)
                    throw new HttpException('zibal unavailable', 503)
                })),
        )

        const { trackId, result, message } = responseFromRequestPaymentUrl

        if (trackId && result === 100)
        {
            return {
                trackId,
                result,
                startPaymentUrl: `${process.env.ZIBAL_START_PAYMENT_URL}/${trackId}`,
            }
        }

        this.logger.verbose(`connection fail in the zibal | Result : ${JSON.stringify(result)}`)
        throw new HttpException('connection fail in the zibal', 400)
    }

    verifyPayment(): Promise<unknown>
    {
        throw new Error('Method not implemented.')
    }

    callback(): Promise<unknown>
    {
        throw new Error('Method not implemented.')
    }
}