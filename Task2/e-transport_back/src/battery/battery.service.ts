import { Injectable } from '@nestjs/common';
import { BatteryDto } from './dtos/battery.dto';
import { UpdateBatteryDto } from './dtos/update-battery.dto';
import { CreateBatteryDto } from './dtos/create-battery.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BatteryService {
    constructor(private prisma: PrismaService) { }

    async findAllBattery(): Promise<BatteryDto[]> {
        const result = await this.prisma.battery.findMany();
        return result;
    }

    async createBattery(battery: BatteryDto): Promise<CreateBatteryDto> {
        const result = await this.prisma.battery.create({ data: { ...battery } });
        return result;
    }

    async updateBattery(battery: UpdateBatteryDto, id: string): Promise<CreateBatteryDto> {
        const result = await this.prisma.battery.update({ data: { ...battery }, where: { id: id } });
        return result;
    }

    async deleteBattery(id: string): Promise<CreateBatteryDto> {
        const result = await this.prisma.battery.delete({ where: { id: id } });
        return result;
    }
}
