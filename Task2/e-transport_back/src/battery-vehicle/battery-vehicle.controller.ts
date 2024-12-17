import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BatteryVehicleService } from './battery-vehicle.service';
import { BatteryVehicleDto } from './dtos/battery-vehicle.dto';
import { UpdateBatteryVehicleDto } from './dtos/update-battery-vehicle.dto';

@ApiTags('battery-vehicle')
@Controller('battery-vehicle')
export class BatteryVehicleController {
    constructor(private readonly batteryVehicleService: BatteryVehicleService) { }

    @Get()
    @HttpCode(200)
    public async findAllBatteryVehicle() {
        const result = await this.batteryVehicleService.findAllBatteryVehicle();
        return result
    }

    @Post()
    @HttpCode(201)
    public async createBatteryVehicle(@Body() batteryVehicle: BatteryVehicleDto) {
        const result = await this.batteryVehicleService.createBatteryVehicle(batteryVehicle);
        return result
    }

    @Put(':id')
    @HttpCode(201)
    public async updateBatteryVehicle(@Body() batteryVehicle: UpdateBatteryVehicleDto, @Param('id') id: string) {
        const result = await this.batteryVehicleService.updateBatteryVehicle(batteryVehicle, id);
        return result
    }

    @Delete(':id')
    @HttpCode(200)
    public async deleteBatteryVehicle(@Param('id') id: string) {
        const result = await this.batteryVehicleService.deleteBatteryVehicle(id);
        return result
    }
}
