// import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { RentalVehicleService } from './rental-vehicle.service';
// import { RentalVehicleDto } from './dtos/rental-vehicle.dto';
// import { UpdateRentalVehicleDto } from './dtos/update-rental-vehicle.dto';

// @ApiTags('rental-vehicle')
// @Controller('rental-vehicle')
// export class RentalVehicleController {
//     constructor(private readonly rentalVehicleService: RentalVehicleService) { }

//     @Get()
//     @HttpCode(200)
//     public async findAllRentalVehicle() {
//         const result = await this.rentalVehicleService.findAllRentalVehicle();
//         return result
//     }

//     @Post()
//     @HttpCode(201)
//     public async createRentalVehicle(@Body() rentalVehicle: RentalVehicleDto) {
//         const result = await this.rentalVehicleService.createRentalVehicle(rentalVehicle);
//         return result
//     }

//     @Put(':id')
//     @HttpCode(201)
//     public async updateRentalVehicle(@Body() rentalVehicle: UpdateRentalVehicleDto, @Param('id') id: string) {
//         const result = await this.rentalVehicleService.updateRentalVehicle(rentalVehicle, id);
//         return result
//     }

//     @Delete(':id')
//     @HttpCode(200)
//     public async deleteRentalVehicle(@Param('id') id: string) {
//         const result = await this.rentalVehicleService.deleteRentalVehicle(id);
//         return result
//     }
// }
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RentalVehicleService } from './rental-vehicle.service';
import { RentalVehicleDto } from './dtos/rental-vehicle.dto';
import { UpdateRentalVehicleDto } from './dtos/update-rental-vehicle.dto';

@ApiTags('rental-vehicle')
@Controller('rental-vehicle')
export class RentalVehicleController {
    constructor(private readonly rentalVehicleService: RentalVehicleService) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'List of all rental vehicles returned successfully.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async findAllRentalVehicle() {
        const result = await this.rentalVehicleService.findAllRentalVehicle();
        return result;
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({ status: 201, description: 'Rental vehicle created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async createRentalVehicle(@Body() rentalVehicle: RentalVehicleDto) {
        const result = await this.rentalVehicleService.createRentalVehicle(rentalVehicle);
        return result;
    }

    @Put(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Rental vehicle updated successfully.' })
    @ApiResponse({ status: 404, description: 'Rental vehicle not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async updateRentalVehicle(@Body() rentalVehicle: UpdateRentalVehicleDto, @Param('id') id: string) {
        const result = await this.rentalVehicleService.updateRentalVehicle(rentalVehicle, id);
        return result;
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Rental vehicle deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Rental vehicle not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async deleteRentalVehicle(@Param('id') id: string) {
        const result = await this.rentalVehicleService.deleteRentalVehicle(id);
        return result;
    }
}
