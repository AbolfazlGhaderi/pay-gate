import { HttpException, Injectable, Logger } from '@nestjs/common'
import { ZarinpalPService } from './services/payment-zarinpal.service'
import { PaymentZibalService } from './services/payment-zibal.service'

@Injectable()
export class PaymentGatewayService
{
    logger: Logger = new Logger(PaymentGatewayService.name)

    constructor(
        private ZarinpalPService: ZarinpalPService,
        private paymentZibalService: PaymentZibalService,
    )
    {}
    async test()
    {
        try
        {
            return await this.ZarinpalPService.requestPayment(
                {
                    merchant_id: process.env.ZARINPAL_MERCHANT_ID,
                    amount: '2300000',
                    description: 'payment test',
                    callback_url: `${process.env.DOMAIN_URL}:${process.env.PORT}/payment-gateway/zarinpal-callback`,
                },
            )
        }
        catch (error)
        {
            this.logger.error('Error message : ' + error?.message)
            if (error instanceof HttpException)
                throw new HttpException(error.getResponse(), error.getStatus())

            throw new HttpException('something wrong', 500)
        }
    }
}