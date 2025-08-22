import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Visitor } from './visitor.entity';
import { VisitorController } from './visitor.controller';
import { VisitorService } from './visitor.service';

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
            TypeOrmModule.forFeature([Visitor]),
          ],
          controllers: [VisitorController],
          providers: [VisitorService],
})
export class VisitorModule {

}