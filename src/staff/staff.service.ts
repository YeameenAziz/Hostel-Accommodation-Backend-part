import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './staff.entity';
import { CreateStaffDto } from './staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  // Get all staff details
  async getAllStaff() {
    return this.staffRepository.find();
  }

  // Create a new staff
  async createStaff(createStaffDto: CreateStaffDto): Promise<Staff> {
    const staff = this.staffRepository.create(createStaffDto);
    return this.staffRepository.save(staff);
  }
  

  // Update staff by ID
  async updateStaff(id: number, updateData: Partial<Staff>) {
    await this.staffRepository.update(id, updateData);
    return this.staffRepository.findOne({ where: { id } });
  }

  // Delete staff by ID
  async deleteStaff(id: number){
    await this.staffRepository.delete(id);
  }
}