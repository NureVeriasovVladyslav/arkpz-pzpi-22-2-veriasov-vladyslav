import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BatteryDto } from './dtos/battery.dto';
import { BatteryService } from './battery.service';
import { UpdateBatteryDto } from './dtos/update-battery.dto';

@ApiTags('battery')
@Controller('battery')
export class BatteryController {
    constructor(private readonly batteryService: BatteryService) { }

    @Get()
    @HttpCode(200)
    public async findAllBattery() {
        const result = await this.batteryService.findAllBattery();
        return result
    }

    @Post()
    @HttpCode(201)
    public async createBattery(@Body() battery: BatteryDto) {
        const result = await this.batteryService.createBattery(battery);
        return result
    }

    @Put(':id')
    @HttpCode(201)
    public async updateBattery(@Body() battery: UpdateBatteryDto, @Param('id') id: string) {
        const result = await this.batteryService.updateBattery(battery, id);
        return result
    }

    @Delete(':id')
    @HttpCode(200)
    public async deleteBattery(@Param('id') id: string) {
        const result = await this.batteryService.deleteBattery(id);
        return result
    }
}
