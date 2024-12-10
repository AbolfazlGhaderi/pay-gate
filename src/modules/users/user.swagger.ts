import { generateExampleForSwagger } from '@/app/utils/swaggerMethods.util'
import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { SwaggerConsumes } from '../../common/enums/awagger.consumes.enum'

export function Create_UserSwaggerDecorator()
{
    return applyDecorators(
        ApiOperation({ summary: 'Create a new user' }),
        ApiConsumes(SwaggerConsumes.Json),
        ApiBody({
            description: 'User creation payload with image upload',
            schema: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string', nullable: false },
                    mobile: { type: 'string', nullable: false },
                },
                required: [ 'name', 'email', 'phone' ],
            },
            examples:{
                create:{
                    value: {
                        name: 'Abolfazl',
                        email: 'dev.ghaderi@gmail.com',
                        mobile: '09100368361',
                    },
                },
            },
        }),
        // 200
        ApiResponse({
            status: HttpStatus.CREATED,
            description: 'Created a new category',
            content: {
                'application/json': {
                    examples: {
                        Created: {
                            value: generateExampleForSwagger(HttpStatus.CREATED, {
                                id: 'string',
                            }),
                        },
                    },
                },
            },
        }),
        // 400
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Error in the validation of the Body or Bad request',
            content: {
                'application/json': {
                    examples: {
                        BadRequest: {
                            value: generateExampleForSwagger(HttpStatus.BAD_REQUEST, {
                            }),
                        },
                    },
                },
            },
        }),
    )
}
