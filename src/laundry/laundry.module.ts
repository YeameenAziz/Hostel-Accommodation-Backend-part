import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule for DB connection
import { LaundryController } from './laundry.controller';
import { LaundryService } from './laundry.service';
import { Laundry } from './laundry.entity'; // Import Laundry entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Laundry]), // Register the Laundry entity with TypeORM
  ],
  controllers: [LaundryController],
  providers: [LaundryService],
})
export class LaundryModule {}
