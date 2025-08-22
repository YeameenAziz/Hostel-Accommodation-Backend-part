import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './notice.entity';

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
        TypeOrmModule.forFeature([Notice]), // Register the Room entity here
      ],
      controllers: [NoticeController],
      providers: [NoticeService],
})
export class NoticeModule {}
