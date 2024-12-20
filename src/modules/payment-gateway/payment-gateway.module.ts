import { Module } from '@nestjs/common'
import { PaymentGatewayService } from './payment-gateway.service'
import { ZarinpalPService } from './services/payment-zarinpal.service'
import { ZibalPService } from './services/payment-zibal.service'
import { PaymentGatewayController } from './payment-gateway.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [ HttpModule ],
    controllers: [ PaymentGatewayController ],
    providers: [ PaymentGatewayService, ZarinpalPService, ZibalPService ],
})
export class PaymentGatewayModule {}