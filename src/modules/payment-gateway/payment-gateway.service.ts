import { HttpException, Injectable, Logger } from '@nestjs/common'
import { PaymentZarinpalService } from './services/payment-zarinpal.service'
import { PaymentZibalService } from './services/payment-zibal.service'

@Injectable()
export class PaymentGatewayService
{
    logger: Logger = new Logger(PaymentGatewayService.name)

    constructor(
        private paymentZarinpalService: PaymentZarinpalService,
        private paymentZibalService: PaymentZibalService,
    )
    {}
    async test()
    {
        try
        {
            return await this.paymentZarinpalService.requestPayment(
                {
                    merchant_id:'1344b5d4-0048-11e8-94db-005056a205be',
                    amount:'2300000',
                    description:'خرید خودرو',
                    callback_url:'http://localhost:3000/payment-gateway/zarinpal-callback',
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