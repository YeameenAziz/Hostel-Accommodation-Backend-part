import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthModule } from '../auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'hostel',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Specify the entity path
      synchronize: true, // Auto-sync entities with the database (be careful in production!)
    }),
    TypeOrmModule.forFeature([User]), // Feature-specific entity
  ],
  providers: [UserService], // Register UserService
  controllers: [UserController], // Register UserController
  exports: [UserService], // Export UserService for use in other modules
})
export class UserModule {}
