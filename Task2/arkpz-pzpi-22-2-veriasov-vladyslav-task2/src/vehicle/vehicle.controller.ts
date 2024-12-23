import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';
import { VehicleDto } from './dtos/vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'List of all vehicles returned successfully.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async findAllVehicle() {
        const result = await this.vehicleService.findAllVehicle();
        return result;
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({ status: 201, description: 'Vehicle created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async createVehicle(@Body() vehicle: VehicleDto) {
        const result = await this.vehicleService.createVehicle(vehicle);
        return result;
    }

    @Put(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Vehicle updated successfully.' })
    @ApiResponse({ status: 404, description: 'Vehicle not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async updateVehicle(@Body() vehicle: UpdateVehicleDto, @Param('id') id: string) {
        const result = await this.vehicleService.updateVehicle(vehicle, id);
        return result;
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Vehicle deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Vehicle not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async deleteVehicle(@Param('id') id: string) {
        const result = await this.vehicleService.deleteVehicle(id);
        return result;
    }

    @Get('vehicle/distance/:id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'List of all vehicles returned successfully.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async calculateTotalDistance(@Param('id') vehicleId: string): Promise<number> {
        const result = await this.vehicleService.calculateTotalDistance(vehicleId);
        return result;
    }
}
