import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RentalModule } from './rental/rental.module';
import { PaymentModule } from './payment/payment.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { BatteryModule } from './battery/battery.module';
import { RentalVehicleModule } from './rental-vehicle/rental-vehicle.module';
import { BatteryVehicleModule } from './battery-vehicle/battery-vehicle.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule, RentalModule, PaymentModule, VehicleModule, BatteryModule, RentalVehicleModule, BatteryVehicleModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
