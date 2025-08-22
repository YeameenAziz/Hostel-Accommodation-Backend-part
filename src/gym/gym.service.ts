import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gym } from './gym.entity';

@Injectable()
export class GymService {
  constructor(
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>,
  ) {}

  // Fetch all gyms
  async getAllGyms() {
    return await this.gymRepository.find();
  }

  // Fetch a gym by its ID
  async getSearchGym(gym_id: string) {
    const gym = await this.gymRepository.findOne({ where: { gym_id } });
    if (!gym) {
      return { message: 'Gym Info not found' };
    }
    return gym;
  }

  // Add a new gym
  async addNewGym(body: any) {
    const newGym = this.gymRepository.create(body); // Create gym from request body
    await this.gymRepository.save(newGym); // Save new gym to database
    return { message: 'New Gym info Added', gym: newGym }; // Return custom message along with gym data
  }
  
//update Part
  async updateGym(gym_id: string, body: any) {
    const gym = await this.gymRepository.findOne({ where: { gym_id } });
    if (!gym) {
      return { message: 'Gym not found' };
    }
  
    // Update gym with new data
    const updatedGym = Object.assign(gym, body);
    await this.gymRepository.save(updatedGym); // Save the updated gym
    
    return { 
      updatedGym, 
      message: 'Gym info updated successfully' 
    }; // Return both the updated info and success message
  }
  
  

  // Delete a gym by its ID
  async deleteGym(gym_id: string) {
    const result = await this.gymRepository.delete({ gym_id });
    if (result.affected === 0) {
      return { message: 'Gym not found' };
    }
    return { message: 'Gym deleted successfully' };
  }
  
  
}
