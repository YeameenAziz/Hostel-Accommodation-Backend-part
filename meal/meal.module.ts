import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './meal.entity';
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
      database: 'hostel', // Change this to the appropriate database for meals if needed
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Meal]), // Register the Meal entity here
  ],
  controllers: [AppController, MealController], // Using MealController
  providers: [AppService, MealService], // Using MealService
})
export class MealModule {}