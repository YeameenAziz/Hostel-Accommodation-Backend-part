import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from './staff.entity';
import { CreateStaffDto } from './staff.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // Get all staff details
  @Get()
  async getAllStaff() {
    return this.staffService.getAllStaff();
  }

  // Create a new staff
  @Post('/createStaff')
  async createStaff(@Body() createStaffDto: CreateStaffDto){
    return this.staffService.createStaff(createStaffDto);
  }

  // Update staff by ID
  @Put('/update/:id')
  async updateStaff(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Staff>,
  ): Promise<Staff> {
    return this.staffService.updateStaff(id, updateData);
  }

  // Delete staff by ID
  @Delete('/deleteStaff/:id')
  async deleteStaff(@Param('id', ParseIntPipe) id: number) {
    await this.staffService.deleteStaff(id);
  }
}