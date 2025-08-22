import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity'; // 
import { AdminController } from './admin.controller';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'hostel',
      entities: [__dirname + '/../*/.entity{.ts,.js}'],
      synchronize: true,
    }),AuthModule,

    TypeOrmModule.forFeature([Admin]), // 
  ],
  controllers:[AdminController , AppController],
  providers: [AdminService,AppService],
  exports: [AdminService],
})
export class AdminModule {}



