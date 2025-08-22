import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './admin.dto';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Show all admins
  @Get()
  getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  // Register new admin
  @Post('/registerAdmin')
  async register(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  // Login admin
  @Post('/loginAdmin')
  async loginAdmin(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ message: string; admin: Admin }> {
    const admin = await this.adminService.validateAdmin(email, password);
    return { message: 'Login successful', admin };
  }

  // Get admin profile by name
  @Get('/:name')
  async getAdminProfile(@Param('name') name: string): Promise<Admin> {
    return this.adminService.getAdminProfileByName(name);
  }

  // Update admin details by name
  @Put('/updateAdmin/:name')  // Changed to PUT
  async updateAdmin(
    @Param('name') name: string,  // Use name to identify the admin
    @Body() updateData: Partial<Admin>
  ): Promise<Admin> {
    return this.adminService.updateAdmin(name, updateData);  // Pass name and update data to service
  }
}