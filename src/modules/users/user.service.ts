/* eslint-disable @typescript-eslint/naming-convention */
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { SchemaNames } from '@/common/enums/schema-name.enum'
import { Model } from 'mongoose'
import { User } from '@/schemas/user.schema'
import { CreateNewUserDto } from './dto/create-new-user.dto'

@Injectable()
export class UserService
{
    private logger: Logger
    constructor(
      @InjectModel(SchemaNames.User)
      private readonly userModel: Model<User>,
    )
    {
        this.logger = new Logger(UserService.name)
    }

    async getAllUsers()
    {
        try
        {
            return await this.userModel.find()
        }
        catch (error)
        {
            this.logger.error('Error message : ' + error?.message)
            if (error instanceof HttpException)
                throw new HttpException(error.getResponse(), error.getStatus())

            throw new HttpException('something wrong', 500)
        }
    }


    async createNewUser(data: CreateNewUserDto)
    {
        try
        {
            const newUser = await this.userModel.create(
                {
                    email: data.email,
                    mobile: data.mobile,
                    name: data.name,
                },
            )


            return {
                id: newUser._id,
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
    async updateUser(id: string)
    {
        try
        {
            const user = await this.userModel.findOne({
                _id: id,
            })

            if (!user)
            {
                throw new HttpException('user not found', 404)
            }

            return await this.userModel.updateOne({
                _id: id,
            }, {
                name: 'ali',
            })
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
