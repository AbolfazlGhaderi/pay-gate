import { HttpException, Injectable, Logger } from '@nestjs/common'
import { ZarinpalPService } from './services/payment-zarinpal.service'
import { PaymentZibalService } from './services/payment-zibal.service'
import { ZarinpalGCallbackDto } from './dtos/zarinpal-gateway-callback.dto'
import { CreateRequestPaymentDto } from './dtos/create-request-payment.dto'

@Injectable()
export class PaymentGatewayService
{
    logger: Logger = new Logger(PaymentGatewayService.name)

    constructor(
        private ZarinpalPService: ZarinpalPService,
        private paymentZibalService: PaymentZibalService,
    )
    {}
    async createRequestPayment(data : CreateRequestPaymentDto)
    {
        try
        {
            if (data.gateway === 'zarinpal')
            {
                return await this.ZarinpalPService.requestPayment(
                    {
                        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
                        amount: data.amount,
                        description: data.description,
                        callback_url: `${process.env.DOMAIN_URL}:${process.env.PORT}/payment-gateway/zarinpal-callback`,
                    },
                )
            }
            else if (data.gateway === 'zibal')
            {
                return await this.paymentZibalService.requestPayment()
            }
            else
            {
                throw new HttpException('gateway not found', 404)
            }
        }
        catch (error)
        {
            this.logger.error('Error message : ' + error?.message)
            if (error instanceof HttpException)
                throw new HttpException(error.getResponse(), error.getStatus())

            throw new HttpException('something wrong', 500)
        }
    }

    async zarinpalCallback(data: ZarinpalGCallbackDto)
    {

    }
}