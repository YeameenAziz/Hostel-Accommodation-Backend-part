import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

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
    TypeOrmModule.forFeature([Room]), // Register the Room entity here
  ],
  controllers: [AppController,RoomController],
  providers: [AppService,RoomService],
})
export class RoomModule {}
