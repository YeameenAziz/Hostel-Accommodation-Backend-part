import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  // Import TypeOrmModule
import { PlayZoneController } from './play-zone.controller';
import { PlayZoneService } from './play-zone.service';
import { PlayZone } from './play-zone.entity';  // Import PlayZone entity

@Module({
  imports: [TypeOrmModule.forFeature([PlayZone])],  // Register PlayZone entity with TypeORM
  controllers: [PlayZoneController],
  providers: [PlayZoneService],
})
export class PlayZoneModule {}

