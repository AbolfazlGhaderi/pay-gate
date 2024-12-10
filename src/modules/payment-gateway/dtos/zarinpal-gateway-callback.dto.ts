import { IsEnum, IsString } from 'class-validator'

export class ZarinpalGCallbackDto
{
    @IsString()
    @IsEnum([ 'OK', 'NOK' ])
    Status: string

    @IsString()
    Authority: string
}