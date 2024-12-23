import { Injectable } from '@nestjs/common';
import { VehicleDto } from './dtos/vehicle.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

@Injectable()
export class VehicleService {
    constructor(private prisma: PrismaService) { }

    async findAllVehicle(): Promise<VehicleDto[]> {
        const result = await this.prisma.vehicle.findMany();
        return result;
    }

    async createVehicle(vehicle: VehicleDto): Promise<CreateVehicleDto> {
        const result = await this.prisma.vehicle.create({ data: { ...vehicle } });
        return result;
    }

    async updateVehicle(vehicle: UpdateVehicleDto, id: string): Promise<CreateVehicleDto> {
        const result = await this.prisma.vehicle.update({ data: { ...vehicle }, where: { id: id } });
        return result;
    }

    async deleteVehicle(id: string): Promise<CreateVehicleDto> {
        const result = await this.prisma.vehicle.delete({ where: { id: id } });
        return result;
    }

    async calculateTotalDistance(vehicleId: string): Promise<number> {
        // const rentals = await this.prisma.rentalVehicle.findMany({
        //     where: { vehicleId },
        //     include: { rental: true },
        // });

        // return rentals.reduce((total, rentalVehicle) => total + rentalVehicle.rental.distance, 0);

        // Отримуємо всі оренди для вказаного транспортного засобу
        const rentals = await this.prisma.rentalVehicle.findMany({
            where: { vehicleId },
            include: { rental: true },
        });

        // Обчислюємо загальну дистанцію
        const totalDistance = rentals.reduce(
            (total, rentalVehicle) => total + rentalVehicle.rental.distance,
            0,
        );

        // Оновлюємо поле `runnedDistance` у транспортному засобі
        await this.prisma.vehicle.update({
            where: { id: vehicleId },
            data: { runnedDistance: totalDistance },
        });

        // Повертаємо обчислену загальну дистанцію
        return totalDistance;
    }
}
