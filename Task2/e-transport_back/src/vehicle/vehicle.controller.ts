import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';
import { VehicleDto } from './dtos/vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) { }

    @Get()
    @HttpCode(200)
    public async findAllVehicle() {
        const result = await this.vehicleService.findAllVehicle();
        return result
    }

    @Post()
    @HttpCode(201)
    public async createVehicle(@Body() vehicle: VehicleDto) {
        const result = await this.vehicleService.createVehicle(vehicle);
        return result
    }

    @Put(':id')
    @HttpCode(201)
    public async updateVehicle(@Body() vehicle: UpdateVehicleDto, @Param('id') id: string) {
        const result = await this.vehicleService.updateVehicle(vehicle, id);
        return result
    }

    @Delete(':id')
    @HttpCode(200)
    public async deleteVehicle(@Param('id') id: string) {
        const result = await this.vehicleService.deleteVehicle(id);
        return result
    }
}
