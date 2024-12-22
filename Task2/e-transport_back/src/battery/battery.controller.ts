// import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { BatteryDto } from './dtos/battery.dto';
// import { BatteryService } from './battery.service';
// import { UpdateBatteryDto } from './dtos/update-battery.dto';

// @ApiTags('battery')
// @Controller('battery')
// export class BatteryController {
//     constructor(private readonly batteryService: BatteryService) { }

//     @Get()
//     @HttpCode(200)
//     public async findAllBattery() {
//         const result = await this.batteryService.findAllBattery();
//         return result
//     }

//     @Post()
//     @HttpCode(201)
//     public async createBattery(@Body() battery: BatteryDto) {
//         const result = await this.batteryService.createBattery(battery);
//         return result
//     }

//     @Put(':id')
//     @HttpCode(201)
//     public async updateBattery(@Body() battery: UpdateBatteryDto, @Param('id') id: string) {
//         const result = await this.batteryService.updateBattery(battery, id);
//         return result
//     }

//     @Delete(':id')
//     @HttpCode(200)
//     public async deleteBattery(@Param('id') id: string) {
//         const result = await this.batteryService.deleteBattery(id);
//         return result
//     }
// }

import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BatteryDto } from './dtos/battery.dto';
import { BatteryService } from './battery.service';
import { UpdateBatteryDto } from './dtos/update-battery.dto';

@ApiTags('battery')
@Controller('battery')
export class BatteryController {
    constructor(private readonly batteryService: BatteryService) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'List of all batteries returned successfully.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async findAllBattery() {
        const result = await this.batteryService.findAllBattery();
        return result;
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({ status: 201, description: 'Battery created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async createBattery(@Body() battery: BatteryDto) {
        const result = await this.batteryService.createBattery(battery);
        return result;
    }

    @Put(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Battery updated successfully.' })
    @ApiResponse({ status: 404, description: 'Battery not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async updateBattery(@Body() battery: UpdateBatteryDto, @Param('id') id: string) {
        const result = await this.batteryService.updateBattery(battery, id);
        return result;
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Battery deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Battery not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async deleteBattery(@Param('id') id: string) {
        const result = await this.batteryService.deleteBattery(id);
        return result;
    }
}
