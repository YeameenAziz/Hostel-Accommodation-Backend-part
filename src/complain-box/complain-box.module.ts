import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplainBox } from './complain-box.entity'; // Ensure correct path
import { ComplainBoxService } from './complain-box.service';
import { ComplainBoxController } from './complain-box.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ComplainBox])], // Register the entity here
  controllers: [ComplainBoxController],
  providers: [ComplainBoxService],
  exports: [ComplainBoxService], // Optional if used in other modules
})
export class ComplainBoxModule {}

