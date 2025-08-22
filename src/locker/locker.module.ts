import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locker } from './locker.entity';
import { LockerController } from './locker.controller';
import { LockerService } from './locker.service';

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
            TypeOrmModule.forFeature([Locker]),
          ],
          controllers: [LockerController],
          providers: [LockerService],
})
export class LockerModule {}