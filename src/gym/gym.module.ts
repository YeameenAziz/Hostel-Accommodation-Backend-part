import { Module } from '@nestjs/common';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gym } from './gym.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gym])], // Import TypeOrmModule with Gym entity
  controllers: [GymController],
  providers: [GymService],
})
export class GymModule {}
