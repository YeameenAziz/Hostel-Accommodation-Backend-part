import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComplainBox } from './complain-box.entity';
import { CreateComplainDto, UpdateComplainDto } from './complain-box.dto';

@Injectable()
export class ComplainBoxService {
  constructor(
    @InjectRepository(ComplainBox)
    private readonly complainBoxRepository: Repository<ComplainBox>,
  ) {}

  async findAll(): Promise<ComplainBox[]> {
    return await this.complainBoxRepository.find();
  }

  async create(createComplainDto: CreateComplainDto): Promise<ComplainBox> {
    // Ensure that only the necessary properties are passed for creation
    const newComplain = this.complainBoxRepository.create({
      userId: createComplainDto.userId,
      text: createComplainDto.text,
      date: createComplainDto.date,
    });
  
    // Save and return the new complain
    return await this.complainBoxRepository.save(newComplain);
  }
  

  async findOne(complain_id: number): Promise<ComplainBox> {
    const complain = await this.complainBoxRepository.findOne({ where: { id: complain_id } });
    if (!complain) {
      throw new NotFoundException(`Complaint with ID ${complain_id} not found`);
    }
    return complain;
  }

  async update(complain_id: number, updateComplainDto: UpdateComplainDto): Promise<{ message: string; updatedComplain: ComplainBox }> {
    const complain = await this.findOne(complain_id);
    Object.assign(complain, updateComplainDto);
    const updatedComplain = await this.complainBoxRepository.save(complain);
    return {
      message: 'Updated successfully',
      updatedComplain,
    };
  }

  async remove(complain_id: number): Promise<{
    affected: number; message: string 
}> {
    const complain = await this.findOne(complain_id);
    const result = await this.complainBoxRepository.remove(complain);
    return { affected: result.length, message: 'Deleted successfully' }; // You can use result.length if result is an array
}


  async findByUserIdAndDate(userId: string, date: string): Promise<ComplainBox> {
    return await this.complainBoxRepository.findOne({ where: { userId, date } });
  }

  
}
