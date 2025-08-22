import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  // Get all admins
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  // Create a new admin
  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { name, email, password } = createAdminDto;

    // Check if admin already exists by email
    const existingAdmin = await this.adminRepository.findOne({ where: { email } });
    if (existingAdmin) {
      throw new NotFoundException('Admin with this email already exists');
    }

    // Create a new admin instance
    const admin = this.adminRepository.create({ name, email, password });

    // Save the admin to the database
    return this.adminRepository.save(admin);
  }

  // Validate admin credentials (for login)
  async validateAdmin(email: string, password: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    if (admin.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return admin;
  }

  // Get admin profile by name
  async getAdminProfileByName(name: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { name } });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  // Update admin details by name
  async updateAdmin(name: string, updateData: Partial<Admin>): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { name } });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    // Update the admin with new data
    Object.assign(admin, updateData);

    // Save the updated admin
    return this.adminRepository.save(admin);
  }
}