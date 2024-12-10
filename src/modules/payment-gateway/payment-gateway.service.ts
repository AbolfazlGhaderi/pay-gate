import { HttpException, Injectable, Logger } from '@nestjs/common'
import { ZarinpalPService } from './services/payment-zarinpal.service'
import { ZibalPService } from './services/payment-zibal.service'
import { ZarinpalGCallbackDto } from './dtos/zarinpal-gateway-callback.dto'
import { CreateRequestPaymentDto } from './dtos/create-request-payment.dto'

@Injectable()
export class PaymentGatewayService
{
    logger: Logger = new Logger(PaymentGatewayService.name)

    constructor(
        private ZarinpalPService: ZarinpalPService,
        private paymentZibalService: ZibalPService,
    )
    {}
    async createRequestPayment(data : CreateRequestPaymentDto)
    {
        try
        {
            if (data.gateway === 'zarinpal')
            {
                return await this.ZarinpalPService.createRequestPayment(
                    {
                        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
                        amount: data.amount,
                        description: data.description,
                        callback_url: `${process.env.DOMAIN_URL}:${process.env.PORT}/payment-gateway/zarinpal-callback`,
                        metadata: data?.metadata_zarinpal,
                    },
                )
            }
            else if (data.gateway === 'zibal')
            {
                return await this.paymentZibalService.createRequestPayment({
                    merchant: process.env.ZIBAL_MERCHANT_ID,
                    amount: data.amount,
                    description: data.description,
                    callbackUrl: `${process.env.DOMAIN_URL}:${process.env.PORT}/payment-gateway/zibal-callback`,
                    mobile: data.metadata_zibal?.mobile,
                    allowedCards: data.metadata_zibal?.allowedCards,
                    nationalCode: data.metadata_zibal?.nationalCode,
                    checkMobileWithCard: data.metadata_zibal?.checkMobileWithCard,
                })
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

    async zibalCallback(data: unknown)
    {

    }
}