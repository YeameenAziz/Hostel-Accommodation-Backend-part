import { Injectable } from '@nestjs/common';
import { homeMessageType } from './app.datatype';

@Injectable()
export class AppService {

  setHomePage(): homeMessageType{
    const messageData = {
       message: "Welcome to Hostel Accommodation System", 
       pageInfo: "This is Home page", 
       inspireBy: "S M ABDULLAH SHAFI Sir", 
       developer: "Yeameen Aziz Abdullah (21-44886-2)"
    }
    
    return messageData; 
  }
}
