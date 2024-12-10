import { Logger, Module, LoggerService } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { SchemaNames } from '../../common/enums/schema-name.enum'
import { UserSchema } from '../../schemas/user.schema'

@Module(
    {
        imports:[
            MongooseModule.forFeature([
                {
                    name: SchemaNames.User,
                    schema: UserSchema,
                },
            ]),
        ],
        controllers : [ UserController ],
        providers : [ UserService ],
    },
)
export class UserModule
{}