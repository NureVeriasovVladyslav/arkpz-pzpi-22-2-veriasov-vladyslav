import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(200)
    public async findAllUser() {
        const result = await this.userService.findAllUser();
        return result
    }

    @Post()
    @HttpCode(201)
    public async createUser(@Body() user: UserDto) {
        const result = await this.userService.createUser(user);
        return result
    }

    @Put(':id')
    @HttpCode(201)
    public async updateUser(@Body() user: UpdateUserDto, @Param('id') id: string) {
        const result = await this.userService.updateUser(user, id);
        return result
    }

    @Delete(':id')
    @HttpCode(200)
    public async deleteUser(@Param('id') id: string) {
        const result = await this.userService.deleteUser(id);
        return result
    }
}
