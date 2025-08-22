import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  // Home page route
  setRoom_HomePage(): string {
    return 'This is Hostel Room Page!';
  }

  // Show All Room Information
  async getAll_Room() {
    const message = 'All rooms reserved successfully!';
    const rooms = await this.roomRepository.find();
    return { message, rooms };
  }

  // Search Room by using room_id
  async getSearchRoom(id: string) {
    const room = await this.roomRepository.findOne({ where: { room_id: id } });
    return room || { message: 'Room not found!' };
  }

  // Add New Room
  async addNewRoom(data: any) {
    const newRoom = this.roomRepository.create(data);
    await this.roomRepository.save(newRoom);
    return {
      message: 'New Room Added Successfully',
      Data: newRoom,
    };
  }

  // Update Room Information
  async updateRoom(updateId: string, updatedData: any) {
    const room = await this.roomRepository.findOne({ where: { room_id: updateId } });

    if (!room) {
      return { message: 'Room not found!' };
    }

    await this.roomRepository.update(room.id, updatedData);
    return {
      message: 'Room updated successfully!',
      updatedRoom: { ...room, ...updatedData },
    };
  }

  // Delete Room Information
  async deleteRoom(id: string) {
    const room = await this.roomRepository.findOne({ where: { room_id: id } });

    if (!room) {
      return { message: 'Room not found!' };
    }

    await this.roomRepository.delete(room.id);
    return {
      message: `Room with ID ${id} deleted successfully.`,
      deletedRoom: room,
    };
  }
}