import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { PaymentDto } from './dtos/payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';

@Injectable()
export class PaymentService {
    constructor(private prisma: PrismaService) { }

    async findAllPayment(): Promise<PaymentDto[]> {
        const result = await this.prisma.payment.findMany();
        return result;
    }

    async createPayment(payment: PaymentDto): Promise<CreatePaymentDto> {
        const result = await this.prisma.payment.create({ data: { ...payment } });
        return result;
    }

    async updatePayment(payment: UpdatePaymentDto, id: string): Promise<CreatePaymentDto> {
        const result = await this.prisma.payment.update({ data: { ...payment }, where: { id: id } });
        return result;
    }

    async deletePayment(id: string): Promise<CreatePaymentDto> {
        const result = await this.prisma.payment.delete({ where: { id: id } });
        return result;
    }
}
