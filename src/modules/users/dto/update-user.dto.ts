import { IsMongoId } from 'class-validator'

export class UpdateUserDto
{
    @IsMongoId()
    id: string
}