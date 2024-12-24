import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PaymentDto, RentalDto } from './dtos/userPlus.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'List of all users returned successfully.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async findAllUser() {
        const result = await this.userService.findAllUser();
        return result;
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({ status: 201, description: 'User created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async createUser(@Body() user: UserDto) {
        const result = await this.userService.createUser(user);
        return result;
    }

    @Put(':email')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User updated successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async updateUser(@Body() user: UpdateUserDto, @Param('email') email: string) {
        const result = await this.userService.updateUser(user, email);
        return result
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User deleted successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async deleteUser(@Param('id') id: string) {
        const result = await this.userService.deleteUser(id);
        return result;
    }

    @Get(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User details returned successfully.' })
    @HttpCode(404)
    @ApiResponse({ status: 404, description: 'User not found.' })
    @HttpCode(500)
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async getUserDetails(@Param('id') userId: string): Promise<UserDto> {
        return this.userService.getUserPlus(userId);
    }

    @Get('payments/user/:id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User details returned successfully.' })
    @HttpCode(404)
    @ApiResponse({ status: 404, description: 'User not found.' })
    @HttpCode(500)
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async getAllUserPayments(@Param('id') userId: string): Promise<PaymentDto[]> {
        return this.userService.getAllUserPayments(userId);
    }

    @Get('rentals/user/:id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User details returned successfully.' })
    @HttpCode(404)
    @ApiResponse({ status: 404, description: 'User not found.' })
    @HttpCode(500)
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async getAllUserRentals(@Param('id') userId: string): Promise<RentalDto[]> {
        return this.userService.getAllUserRentals(userId);
    }
    
}

