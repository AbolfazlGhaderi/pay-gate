/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PaymentGatewayService } from './payment-gateway.service'
import { ZarinpalGCallbackDto } from './dtos/zarinpal-gateway-callback.dto'
import { CreateRequestPaymentDto } from './dtos/create-request-payment.dto'
import { Create_RequestGatewaySwaggerDecorator } from './payment-gateway.swagger'

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
        return await this.paymentGatewayService.zarinpalCallback(data)
    }

    @Post('request')
    @Create_RequestGatewaySwaggerDecorator()
    async createRequestPayment_Handler(@Body() data: CreateRequestPaymentDto)
    {
        return await this.paymentGatewayService.createRequestPayment(data)
    }
}