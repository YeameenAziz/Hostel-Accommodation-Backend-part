import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Laundry } from './laundry.entity';

@Injectable()
export class LaundryService {
  constructor(
    @InjectRepository(Laundry)
    private readonly laundryRepository: Repository<Laundry>,
  ) {}

  // Home page route for Laundry
  setLaundry_HomePage(): string {
    return "Welcome to the Laundry Service Page!";
  }

  // Show All Laundry Reservations
  async getAllLaundry() {
    const laundryItems = await this.laundryRepository.find(); // Fetch all laundry reservations
    return {
      message: "All Laundry Reservations Fetched Successfully",  // Success message
      data: laundryItems,  // Data containing all laundry reservations
    };
  }

  // Search for a specific Laundry Reservation by user_id
  async getSearchLaundry(user_id: string) {
    const laundry = await this.laundryRepository.findOne({ where: { user_id } });
    return laundry || { message: "Laundry Reservation not found!" };
  }

  // Add New Laundry Reservation
  async addNewLaundry(data: any) {
    const newLaundry = this.laundryRepository.create(data);  // Create new laundry reservation from provided data
    await this.laundryRepository.save(newLaundry);  // Save to the repository
    return {
      message: "New Laundry Reservation Added Successfully",
      data: newLaundry,  // Return the newly added laundry reservation data
    };
  }

  // Update an existing Laundry Reservation
  async updateLaundry(user_id: string, updatedData: any) {
    const laundry = await this.laundryRepository.findOne({ where: { user_id } });

    if (!laundry) {
      return { message: "Laundry Reservation not found!" };
    }

    await this.laundryRepository.update(laundry.id, updatedData);  // Update the laundry reservation
    return {
      message: "Laundry Reservation Updated Successfully",
      updatedLaundry: { ...laundry, ...updatedData },  // Return the updated laundry reservation data
    };
  }

  // Delete a Laundry Reservation
  async deleteLaundry(user_id: string) {
    const laundry = await this.laundryRepository.findOne({ where: { user_id } });

    if (!laundry) {
      return { message: "Laundry Reservation not found!" };
    }

    await this.laundryRepository.delete(laundry.id);  // Delete the laundry reservation
    return {
      message: `Laundry Reservation for User ID ${user_id} deleted successfully.`,
      deletedLaundry: laundry,  // Return the deleted laundry reservation data
    };
  }
}
