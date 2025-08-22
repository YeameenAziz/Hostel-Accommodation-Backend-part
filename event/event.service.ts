import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';
import { EventDTO } from './event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async createEvent(eventDTO: EventDTO) {
    const event = this.eventRepository.create(eventDTO);
    return await this.eventRepository.save(event);
  }

  async getAllEvents() {
    return await this.eventRepository.find();
  }

  async getEventByName(name: string) {
    return await this.eventRepository.findOne({
      where: { name },
    });
  }

  async updateEvent(id: number, eventDTO: EventDTO): Promise<EventEntity> {
    await this.eventRepository.update(id, eventDTO);
    return this.getEventById(id);
  }

  async deleteEvent(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }

  // Optional: If you still need to use the ID-based search
  async getEventById(id: number) {
    return await this.eventRepository.findOne({
      where: { id },
    });
  }
}