import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RentalService } from './rental.service';
import { RentalDto } from './dtos/rental.dto';
import { UpdateRentalDto } from './dtos/update-rental.dto';

@ApiTags('rental')
@Controller('rental')
export class RentalController {
    constructor(private readonly rentalService: RentalService) { }

    @Get()
    @HttpCode(200)
    public async findAllRental() {
        const result = await this.rentalService.findAllRental();
        return result
    }

    @Post()
    @HttpCode(201)
    public async createRental(@Body() rental: RentalDto) {
        const result = await this.rentalService.createRental(rental);
        return result
    }

    @Put(':id')
    @HttpCode(201)
    public async updateRental(@Body() rental: UpdateRentalDto, @Param('id') id: string) {
        const result = await this.rentalService.updateRental(rental, id);
        return result
    }

    @Delete(':id')
    @HttpCode(200)
    public async deleteRental(@Param('id') id: string) {
        const result = await this.rentalService.deleteRental(id);
        return result
    }
}
