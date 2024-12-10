import { IsEnum, IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'


class MetaDataDto
{
    @IsString()
    @IsOptional()
    mobile?: string

    @IsOptional()
    @IsString()
    email?: string

    @IsOptional()
    @IsString()
    card_pan?: string
}

export class CreateRequestPaymentDto
{
    @IsEnum([ 'zarinpal', 'zibal' ])
    gateway: 'zarinpal' | 'zibal'

    @IsNumberString()
    amount: string

    @IsString()
    description: string

    @IsObject()
    @IsOptional()
    @ValidateNested()
    metadata?: MetaDataDto
}
