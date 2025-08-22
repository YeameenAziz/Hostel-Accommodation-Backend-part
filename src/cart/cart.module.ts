import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

@Module({
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), session({
        secret: 'sessionSecret', 
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600000 }, // 1 hour session cookie
      }))
      .forRoutes('*'); 
  }
}