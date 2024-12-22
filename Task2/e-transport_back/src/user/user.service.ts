import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findAllUser(): Promise<UserDto[]> {
        const result = await this.prisma.user.findMany();
        return result;
    }

    async createUser(user: UserDto): Promise<CreateUserDto> {
        const result = await this.prisma.user.create({ data: { ...user } });
        return result;
    }

    async updateUser(user: UpdateUserDto, email: string): Promise<CreateUserDto> {
        const result = await this.prisma.user.update({ data: { ...user }, where: { email: email } });
        return result;
    }

    async deleteUser(id: string): Promise<CreateUserDto> {
        const result = await this.prisma.user.delete({ where: { id: id } });
        return result;
    }

    async getUserPlus(id: string): Promise<CreateUserDto> {
        const result = await this.prisma.user.findUnique({
            where: { id: id },
            include: {
              rental: {
                include: {
                  rentalVehicle: { include: { vehicle: true } },
                  payment: true,
                },
              },
            },
         });
        return result;
    }
    
}
