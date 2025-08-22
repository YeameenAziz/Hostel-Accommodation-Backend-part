import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { homeMessageType } from './app.datatype';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHomePage():homeMessageType{
    return this.appService.setHomePage(); 
  }
}
