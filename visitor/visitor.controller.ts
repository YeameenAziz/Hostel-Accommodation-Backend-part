import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { visitor_Data } from 'src/Custom.dataType';
import { AuthGuard } from '@nestjs/passport';

@Controller('visitor')
export class VisitorController {
    constructor(private readonly visitorService:VisitorService) {}
    

    // Show all visitor, 
    @Get()
    @UseGuards(AuthGuard('jwt'))
    ShowAllVisitor(){
        return this.visitorService.ShowAllVisitor(); 
    }


    // Register new visitor, 
    @Post('/registerNewVisitor')
    @UseGuards(AuthGuard('jwt'))
    RegisterNewVisitor(@Body() registerData:visitor_Data){
        return this.visitorService.RegisterNewVisitor(registerData); 
    }


    // Search Visitor by using date, 
    @Get('/:date')
    @UseGuards(AuthGuard('jwt'))
    SearchVisitor(@Param('date') searchDate:Date){
        return this.visitorService.SearchVisitor(searchDate); 
    }



    // Update Visitor Information
    @Put('/updateVisitor/:id')
    @UseGuards(AuthGuard('jwt'))
    UpdateVisitor(@Param('id') visitor_id:number,  @Body() updateData:visitor_Data){
        return this.visitorService.UpdateVisitor(visitor_id, updateData); 
    }


    // Remove or delete visitor information, 
    @Delete('/deleteVisitor/:id')
    @UseGuards(AuthGuard('jwt'))
    DeleteVisitor(@Param('id') id:number){
        return this.visitorService.DeleteVisitor(id); 
    }

}