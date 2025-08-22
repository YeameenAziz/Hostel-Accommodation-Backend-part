import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomController } from './room/room.controller';
import { RoomService } from './room/room.service';
import { RoomModule } from './room/room.module';
import { NoticeController } from './notice/notice.controller';
import { NoticeService } from './notice/notice.service';
import { NoticeModule } from './notice/notice.module';
import { UserModule } from './user/user.module';
import { ComplainBoxModule } from './complain-box/complain-box.module';
import { GymModule } from './gym/gym.module';
import { PlayZoneModule } from './play-zone/play-zone.module';
import { LaundryModule } from './laundry/laundry.module';
import { AuthModule } from './auth.module';
import { MealModule } from './meal/meal.module';
import { StaffModule } from './staff/staff.module';
import { AdminModule } from './admin/admin.module';
import { LockerModule } from './locker/locker.module';
import { ParkingModule } from './parking/parking.module';
import { CartModule } from './cart/cart.module';
import { VisitorModule } from './visitor/visitor.module';
import { MailModule } from './mail/mail.module';
import { GroceryModule } from './grocery/grocery.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [RoomModule, NoticeModule, UserModule, ComplainBoxModule, GymModule, PlayZoneModule, LaundryModule, AuthModule, MealModule, StaffModule, AdminModule, LockerModule, ParkingModule, CartModule, VisitorModule, MailModule, GroceryModule, EventModule],
  // controllers: [NoticeController],
  // providers: [NoticeService],
  // controllers: [AppController, RoomController],
  // providers: [AppService, RoomService],
})
export class AppModule {}
