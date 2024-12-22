// import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { PaymentDto } from './dtos/payment.dto';
// import { PaymentService } from './payment.service';
// import { UpdatePaymentDto } from './dtos/update-payment.dto';

// @ApiTags('payment')
// @Controller('payment')
// export class PaymentController {
//     constructor(private readonly paymentService: PaymentService) { }

//     @Get()
//     @HttpCode(200)
//     public async findAllPayment() {
//         const result = await this.paymentService.findAllPayment();
//         return result
//     }

//     @Post()
//     @HttpCode(201)
//     public async createPayment(@Body() payment: PaymentDto) {
//         const result = await this.paymentService.createPayment(payment);
//         return result
//     }

//     @Put(':id')
//     @HttpCode(201)
//     public async updatePayment(@Body() payment: UpdatePaymentDto, @Param('id') id: string) {
//         const result = await this.paymentService.updatePayment( payment, id);
//         return result
//     }

//     @Delete(':id')
//     @HttpCode(200)
//     public async deletePayment(@Param('id') id: string) {
//         const result = await this.paymentService.deletePayment(id);
//         return result
//     }
// }

import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentDto } from './dtos/payment.dto';
import { PaymentService } from './payment.service';
import { UpdatePaymentDto } from './dtos/update-payment.dto';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'List of all payments returned successfully.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async findAllPayment() {
        const result = await this.paymentService.findAllPayment();
        return result;
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({ status: 201, description: 'Payment created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async createPayment(@Body() payment: PaymentDto) {
        const result = await this.paymentService.createPayment(payment);
        return result;
    }

    @Put(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Payment updated successfully.' })
    @ApiResponse({ status: 404, description: 'Payment not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async updatePayment(@Body() payment: UpdatePaymentDto, @Param('id') id: string) {
        const result = await this.paymentService.updatePayment(payment, id);
        return result;
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Payment deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Payment not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async deletePayment(@Param('id') id: string) {
        const result = await this.paymentService.deletePayment(id);
        return result;
    }
}
