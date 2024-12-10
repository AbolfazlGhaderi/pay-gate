/* eslint-disable @typescript-eslint/require-await */
import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateNewUserDto } from './dto/create-new-user.dto'
import { Create_UserSwaggerDecorator } from './user.swagger'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('User')
@Controller('User')
export class UserController
{
    constructor(
        private userService: UserService,
    )
    {}

    @Get('')
    async getAllUsers_Handler()
    {
        return await this.userService.getAllUsers()
    }

    @Post()
    @Create_UserSwaggerDecorator()
    async createNewUser_Handler(@Body() bodyData: CreateNewUserDto)
    {
        return await this.userService.createNewUser(bodyData)
    }

    @Put()
    async updateUser_Handler(@Body() data: UpdateUserDto )
    {
        return await this.userService.updateUser(data.id)
    }
}