import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './parking.entity';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'hostel',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Parking]),
  ],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}