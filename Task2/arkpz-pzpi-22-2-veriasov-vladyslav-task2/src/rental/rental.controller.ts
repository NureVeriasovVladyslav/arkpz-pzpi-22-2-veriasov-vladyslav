import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RentalService } from './rental.service';
import { RentalDto } from './dtos/rental.dto';
import { UpdateRentalDto } from './dtos/update-rental.dto';

@ApiTags('rental')
@Controller('rental')
export class RentalController {
    constructor(private readonly rentalService: RentalService) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'List of all rentals returned successfully.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async findAllRental() {
        const result = await this.rentalService.findAllRental();
        return result;
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({ status: 201, description: 'Rental created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async createRental(@Body() rental: RentalDto) {
        const result = await this.rentalService.createRental(rental);
        return result;
    }

    @Put(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Rental updated successfully.' })
    @ApiResponse({ status: 404, description: 'Rental not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async updateRental(@Body() rental: UpdateRentalDto, @Param('id') id: string) {
        const result = await this.rentalService.updateRental(rental, id);
        return result;
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Rental deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Rental not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async deleteRental(@Param('id') id: string) {
        const result = await this.rentalService.deleteRental(id);
        return result;
    }

    @Get('total')
    @HttpCode(200)
    async getTotalProfit(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string
    ): Promise<{ totalProfit: number }> {
        try {
            const totalProfit = await this.rentalService.calculateTotalProfit(startDate, endDate);
            return { totalProfit };
        } catch (error) {
            throw new Error(`Error while calculating total profit: ${error.message}`);
        }
    }
}
