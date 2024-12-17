import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentDto } from './dtos/payment.dto';
import { PaymentService } from './payment.service';
import { UpdatePaymentDto } from './dtos/update-payment.dto';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get()
    @HttpCode(200)
    public async findAllPayment() {
        const result = await this.paymentService.findAllPayment();
        return result
    }

    @Post()
    @HttpCode(201)
    public async createPayment(@Body() payment: PaymentDto) {
        const result = await this.paymentService.createPayment(payment);
        return result
    }

    @Put(':id')
    @HttpCode(201)
    public async updatePayment(@Body() payment: UpdatePaymentDto, @Param('id') id: string) {
        const result = await this.paymentService.updatePayment( payment, id);
        return result
    }

    @Delete(':id')
    @HttpCode(200)
    public async deletePayment(@Param('id') id: string) {
        const result = await this.paymentService.deletePayment(id);
        return result
    }
}
