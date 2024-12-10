import { Type } from 'class-transformer'
import { IsArray, IsBoolean, IsEnum, IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'


class ZarinpalMetadataDto
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
class ZibalMetadataDto
{
    @IsString()
    @IsOptional()
    mobile?: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    allowedCards?: string[]

    @IsString()
    @IsOptional()
    nationalCode?: string

    @IsBoolean()
    @IsOptional()
    checkMobileWithCard?: boolean
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
    @ValidateNested({ each: true })
    @Type(() => ZarinpalMetadataDto)
    metadata_zarinpal?: ZarinpalMetadataDto

    @IsObject()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ZibalMetadataDto)
    metadata_zibal?: ZibalMetadataDto
}
