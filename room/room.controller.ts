import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from '@nestjs/passport';
//@UseGuards(AuthGuard('jwt'))


@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    
    // Basic Hostel Room Home Page 
    @Get()
    getRoom_HomePae():string{
        return this.roomService.setRoom_HomePage(); 
    }


    // Show All Room, 
    @Get('/showAllRoom')
    getAll_Room(){
        return this.roomService.getAll_Room(); 
    }
    // Search Just One Room, 
    @Get('/searchRoom/:id')
    getSearchRoom(@Param('id') id:string){
        return this.roomService.getSearchRoom(id); 
    }

    // Add new Room, 
    @Post('/addNewRoom')
    addNewRoom(@Body() data:any){
        return this.roomService.addNewRoom(data); 
    }
    // Update Room Information, 
    @Put('/updateRoom/:id')
    updateRoom(@Param('id') updateId:string, @Body() updatedData:any){
        return this.roomService.updateRoom(updateId, updatedData); 
    }

    // Delete Room 
    @Delete('/deleteRoom/:id')
    deleteRoom(@Param('id') id:string){
        return this.roomService.deleteRoom(id); 
    }
}
