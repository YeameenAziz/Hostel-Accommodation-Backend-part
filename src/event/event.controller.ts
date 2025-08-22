import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDTO } from './event.dto';
import { EventEntity } from './event.entity';


@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }
  
  @Post('/createEvent')
  createEvent(@Body() eventDTO: EventDTO) {
    return this.eventService.createEvent(eventDTO);
  }

  

  @Get(':id')
  getEventById(@Param('id') id: number) {
    return this.eventService.getEventById(id);
  }

  @Put(':id')
  updateEvent(@Param('id') id: number, @Body() eventDTO: EventDTO) {
    return this.eventService.updateEvent(id, eventDTO);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: number) {
    return this.eventService.deleteEvent(id);
  }
}