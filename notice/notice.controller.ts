import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { AuthGuard } from '@nestjs/passport';
//@UseGuards(AuthGuard('jwt'))

@Controller('notice')
export class NoticeController {
    constructor(private readonly noticeService:NoticeService) {}

    // Show All Notice, 
    @Get()
    getAllNotice(){
        return this.noticeService.getAll_Notice(); 
    }

    // Search a notice by notice_ID, 
    @Get('/searchNotice/:id')
    searchNotice(@Param('id') search_id:string){
        return this.noticeService.getSearchNotice(search_id); 
    }


    // Post a new notice
    @Post('/addNewNotice')
    @UseGuards(AuthGuard('jwt'))
    addNewNotice(@Body() data){
        return this.noticeService.addNewNotice(data); 
    }

    // Update a notice by notice_ID,
    @Put('/updateNotice/:id')
    @UseGuards(AuthGuard('jwt'))
    updateNotice(@Param('id') notice_id:string, @Body()  update_data){
        return this.noticeService.updateNotice(notice_id, update_data); 
    }


    // Delete a notice by notice_delete, 
    @Delete('/deleteNotice/:id')
    @UseGuards(AuthGuard('jwt'))
    deleteNotice(@Param('id') notice_id:string){
        return this.noticeService.deleteNotice(notice_id); 
    }


}