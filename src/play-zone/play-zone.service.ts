import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayZone } from './play-zone.entity';

@Injectable()
export class PlayZoneService {
  constructor(
    @InjectRepository(PlayZone)
    private readonly playZoneRepository: Repository<PlayZone>,
  ) {}

  // Home page route
  setPlayZone_HomePage(): string {
    return "This is the Play Zone Page!";
  }

  // Show All Play Zone Reservations
  async getAllPlayZones() {
    return await this.playZoneRepository.find();
  }

  // Search Play Zone by user_id
  async getSearchPlayZone(id: string) {
    const playZone = await this.playZoneRepository.findOne({ where: { user_id: id } });
    return playZone || { message: "Play Zone reservation not found!" };
  }

  // Add New Play Zone Reservation
  async addNewPlayZone(data: any) {
    const newPlayZone = this.playZoneRepository.create(data);
    await this.playZoneRepository.save(newPlayZone);
    return {
      message: "New Play Zone Reservation Added Successfully",
      Data: newPlayZone,
    };
  }

  // Update Play Zone Reservation Information
  async updatePlayZone(updateId: string, updatedData: any) {
    const playZone = await this.playZoneRepository.findOne({ where: { user_id: updateId } });

    if (!playZone) {
      return { message: "Play Zone reservation not found!" };
    }

    await this.playZoneRepository.update(playZone.id, updatedData);
    return {
      message: "Play Zone Reservation updated successfully!",
      updatedPlayZone: { ...playZone, ...updatedData },
    };
  }

  // Delete Play Zone Reservation
  async deletePlayZone(id: string) {
    const playZone = await this.playZoneRepository.findOne({ where: { user_id: id } });

    if (!playZone) {
      return { message: "Play Zone reservation not found!" };
    }

    await this.playZoneRepository.delete(playZone.id);
    return {
      message: `Play Zone reservation for user with ID ${id} deleted successfully.`,
      deletedPlayZone: playZone,
    };
  }
}
