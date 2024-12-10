import { generateExampleForSwagger } from '@/app/utils/swaggerMethods.util'
import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { SwaggerConsumes } from '../../common/enums/awagger.consumes.enum'

export function Create_RequestGatewaySwaggerDecorator()
{
    return applyDecorators(
        ApiOperation({ summary: 'Create a new request gateway' }),
        ApiConsumes(SwaggerConsumes.Json),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    gateway: { type: 'string', enum: [ 'zarinpal', 'zibal' ] },
                    amount: { type: 'string' },
                    description: { type: 'string' },
                    metadata_zarinpal: {
                        type: 'object',
                        properties: {
                            mobile: { type: 'string' },
                            email: { type: 'string' },
                            card_pan: { type: 'string' },
                        },
                    },
                    metadata_zibal: {
                        type: 'object',
                        properties: {
                            mobile: { type: 'string' },
                            allowedCards: { type: 'array' },
                            nationalCode: { type: 'string' },
                            checkMobileWithCard: { type: 'string' },
                        },
                    },
                },
                required: [ 'gateway', 'amount', 'description' ],
            },
            examples:{
                create:{
                    value: {
                        gateway: 'zarinpal',
                        amount: '1000',
                        description: 'test',
                        metadata_zarinpal: {
                            mobile: '09100368361',
                            email: 'dev.ghaderi@gmail.com',
                        },
                        metadata_zibal: {
                            mobile: '09100368361',
                            allowedCards: [ '1234567890123456' ],
                            nationalCode: '1234567890',
                            checkMobileWithCard: true,
                        },
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
                                code: '100',
                                authority: 'string',
                                startPaymentUrl: 'https://sandbox.zarinpal.com/pg/StartPay/S0000000000000000000000000000000x6o1',
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
