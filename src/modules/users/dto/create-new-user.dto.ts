import { IsEmail, IsNumberString, IsString } from 'class-validator'

export class CreateNewUserDto
{
    @IsString()
    name: string

    @IsString()
    @IsEmail()
    email: string

    @IsNumberString()
    mobile: string
}