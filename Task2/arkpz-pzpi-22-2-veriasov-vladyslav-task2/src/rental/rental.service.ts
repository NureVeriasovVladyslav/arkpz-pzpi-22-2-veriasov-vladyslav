import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RentalDto } from './dtos/rental.dto';
import { CreateRentalDto } from './dtos/create-rental.dto';
import { UpdateRentalDto } from './dtos/update-rental.dto';
import { PaymentDto } from 'src/user/dtos/userPlus.dto';
import { RentalVehicleDto } from 'src/rental-vehicle/dtos/rental-vehicle.dto';
import { VehicleDto } from 'src/vehicle/dtos/vehicle.dto';
import { CreateRentalVehicleDto } from 'src/rental-vehicle/dtos/create-rental-vehicle.dto';
import { CreatePaymentDto } from 'src/payment/dtos/create-payment.dto';
import { RentalNotFoundException } from 'src/exceptions/user-exceptions';

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

    async createRentalFull(
        rental: RentalDto,
        payment: PaymentDto,
        rentalVehicle: RentalVehicleDto
    ): Promise<CreateRentalDto> {
        const result = await this.prisma.$transaction(async (prisma) => {
            // Створення прокату
            const newRental = await prisma.rental.create({
                data: {
                    userId: rental.userId,
                    distance: rental.distance,
                    isActive: rental.isActive,
                    avgSpeed: rental.avgSpeed,
                    maxSpeed: rental.maxSpeed,
                    energyConsumed: rental.energyConsumed,
                    dateRented: rental.dateRented,
                    dateReturned: rental.dateReturned,
                    rentalVehicle: {
                        create: {
                            vehicleId: rentalVehicle.vehicleId,
                        },
                    },
                    payment: {
                        create: {
                            paymentMethod: payment.paymentMethod,
                            amount: payment.amount,
                            date: payment.date || new Date().toISOString(), // Встановлюємо поточну дату, якщо не передано
                        },
                    },
                },
                include: {
                    rentalVehicle: true,
                    payment: true,
                },
            });

            // Оновлення пройденої дистанції транспортного засобу
            await prisma.vehicle.update({
                where: { id: rentalVehicle.vehicleId },
                data: {
                    runnedDistance: { increment: rental.distance },
                },
            });

            return newRental;
        });

        return result;
    }

    async getUserRentalsWithVehicles(userId: string) {
        const result = await this.prisma.$queryRaw`
          SELECT * FROM get_user_rentals_with_vehicles(${userId}::uuid);
        `;
        return result;
    }

    // Приклад методу, який може генерувати виключення
    async getRentalById(rentalId: string) {
        const rental = await this.prisma.rental.findUnique({
            where: { id: rentalId },
        });

        if (!rental) {
            throw new RentalNotFoundException(`Rental with ID ${rentalId} not found.`);
        }

        return rental;
    }
    // async createRentalFull(rental: RentalDto, payment: PaymentDto): Promise<CreatePaymentDto> {
    //     const resultRental = await this.prisma.rental.create({ data: { ...rental } });
    //     const resultPayment = await this.prisma.payment.create({ data: { ...payment } });
    //     return result;
    // }
}
