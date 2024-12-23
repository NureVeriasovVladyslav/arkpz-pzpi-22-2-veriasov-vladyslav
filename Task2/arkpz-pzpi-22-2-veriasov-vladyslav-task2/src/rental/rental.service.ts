import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RentalDto } from './dtos/rental.dto';
import { CreateRentalDto } from './dtos/create-rental.dto';
import { UpdateRentalDto } from './dtos/update-rental.dto';

@Injectable()
export class RentalService {
    constructor(private prisma: PrismaService) { }

    async findAllRental(): Promise<RentalDto[]> {
        const result = await this.prisma.rental.findMany();
        return result;
    }

    async createRental(rental: RentalDto): Promise<CreateRentalDto> {
        const result = await this.prisma.rental.create({ data: { ...rental } });
        return result;
    }

    async updateRental(rental: UpdateRentalDto, id: string): Promise<CreateRentalDto> {
        const result = await this.prisma.rental.update({ data: { ...rental }, where: { id: id } });
        return result;
    }

    async deleteRental(id: string): Promise<CreateRentalDto> {
        const result = await this.prisma.rental.delete({ where: { id: id } });
        return result;
    }

    async calculateTotalProfit(startDate: string, endDate: string): Promise<number> {
        const payments = await this.prisma.payment.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
    
        return payments.reduce((total, payment) => total + parseFloat(payment.amount), 0);
    }
}
