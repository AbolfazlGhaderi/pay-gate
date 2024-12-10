import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './modules/users/user.module'

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal:true }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        UserModule,
    ],
    controllers: [  ],
    providers: [  ],
})
export class AppModule {}
