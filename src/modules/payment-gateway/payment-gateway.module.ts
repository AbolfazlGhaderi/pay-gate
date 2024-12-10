import { Module } from '@nestjs/common'
import { PaymentGatewayService } from './payment-gateway.service'
import { PaymentZarinpalService } from './services/payment-zarinpal.service'
import { PaymentZibalService } from './services/payment-zibal.service'
import { PaymentGatewayController } from './payment-gateway.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [ HttpModule ],
    controllers: [ PaymentGatewayController ],
    providers: [ PaymentGatewayService, PaymentZarinpalService, PaymentZibalService ],
})
export class PaymentGatewayModule {}