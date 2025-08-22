import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ComplainBoxService } from './complain-box.service';
import { CreateComplainDto, UpdateComplainDto } from './complain-box.dto';
import { AuthGuard } from '@nestjs/passport';
//@UseGuards(AuthGuard('jwt'))


@Controller('complain-box')
export class ComplainBoxController {
  constructor(private readonly complainBoxService: ComplainBoxService) {}

  // Fetch all complaints
  @Get()
  async getAllComplains() {
    return await this.complainBoxService.findAll();
  }

  // Create a new complaint
  @Post('/createComplain')
  async create(@Body() createComplainDto: CreateComplainDto) {
    const newComplaint = await this.complainBoxService.create(createComplainDto);
    return {
      message: 'Complaint created successfully',
      data: newComplaint,
    };
  }

  // Get a specific complaint by ID
  @Get('/getComplain/:id')
  async findOne(@Param('id') complain_id: string) { // complain_id is now a string
    const id = parseInt(complain_id); // Convert to number here
    const complaint = await this.complainBoxService.findOne(id);
    if (complaint) {
      return complaint;
    } else {
      return { message: 'Complaint not found' };
    }
  }

  // Update a complaint by ID
  @Put('/updateComplain/:id')
  async update(
    @Param('id') complain_id: string, // complain_id is now a string
    @Body() updateComplainDto: UpdateComplainDto,
  ) {
    const id = parseInt(complain_id); // Convert to number here
    const updatedComplaint = await this.complainBoxService.update(id, updateComplainDto);
    if (updatedComplaint) {
      return {
        message: 'Complaint updated successfully',
        data: updatedComplaint,
      };
    } else {
      return { message: 'Complaint not found or update failed' };
    }
  }

  // Delete a complaint by ID
  @Delete('/deleteComplain/:id')
  async remove(@Param('id') complain_id: string) { // complain_id is now a string
    const id = parseInt(complain_id); // Convert to number here
    const result = await this.complainBoxService.remove(id);
    if (result.affected) {
      return { message: 'Complaint deleted successfully' };
    } else {
      return { message: 'Complaint not found or deletion failed' };
    }
  }
}
