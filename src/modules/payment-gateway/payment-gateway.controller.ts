/* eslint-disable @typescript-eslint/require-await */
import { Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PaymentGatewayService } from './payment-gateway.service'
import { ZarinpalGCallbackDto } from './dtos/zarinpal-gateway-callback.dto'

@ApiTags('payment-gateway')
@Controller('payment-gateway')
export class PaymentGatewayController
{
    constructor(
        private readonly paymentGatewayService: PaymentGatewayService,
    ) {}

    @Get('zarinpal-callback')
    async zarinpalCallback_Handler(@Query() data: ZarinpalGCallbackDto)
    {
        console.log(data)
    }

    @Post('request')
    async requestPayment_Handler()
    {
        return await this.paymentGatewayService.test()
    }
}