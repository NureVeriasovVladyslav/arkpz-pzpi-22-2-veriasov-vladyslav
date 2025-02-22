import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodTypes } from '@prisma/client';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, isBoolean } from 'class-validator';

export class UpdateRentalVehicleDto {

    @ApiProperty({
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    vehicleId: string

    @ApiProperty({
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    rentalId: string;

}