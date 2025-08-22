import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { RegisterUserDto } from './register-user.dto';
import { LoginUserDto } from './login-user.dto';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Home page route
  setUser_HomePage(): string {
    return 'This is User Management Page!';
  }

  // Show All User Information
  async getAll_Users() {
    return await this.userRepository.find();
  }

  // Search User by using user_id
  async getSearchUser(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    return user || null; // Return null if the user is not found
  }

  // Register a New User
  async register(email: string, password: string): Promise<User> {
    // Check for duplicate users
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword });
    return await this.userRepository.save(user);
  }

  // Validate User credentials
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  // Add New User with validation
  async addNewUser(registerUserDto: RegisterUserDto) {
    // Validate DTO before proceeding
    const errors = await validate(registerUserDto);
    if (errors.length > 0) {
      const errorMessages = errors
        .map(
          (err) =>
            `${err.property}: ${Object.values(err.constraints).join(', ')}`,
        )
        .join('; ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }
  
    // Create and save the new user
    const newUser = this.userRepository.create(registerUserDto);
    await this.userRepository.save(newUser);
    
    return {
      message: 'New User Added Successfully',
      Data: newUser,
    };
  }
  
  // Update User Information with validation
  async updateUser(updateId: string, updateUserDto: UpdateUserDto) {
    // Validate DTO before proceeding
    const errors = await validate(updateUserDto);
    if (errors.length > 0) {
      const errorMessages = errors
        .map(
          (err) =>
            `${err.property}: ${Object.values(err.constraints).join(', ')}`,
        )
        .join('; ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    const user = await this.userRepository.findOne({
      where: { user_id: updateId },
    });

    if (!user) {
      return { message: 'User not found!' };
    }

    await this.userRepository.update(user.id, updateUserDto);
    return {
      message: 'User updated successfully!',
      updatedUser: { ...user, ...updateUserDto },
    };
  }

  // Delete User Information
  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { user_id: id } });

    if (!user) {
      return { message: 'User not found!' };
    }

    await this.userRepository.delete(user.id);
    return {
      message: `User with ID ${id} deleted successfully.`,
      deletedUser: user,
    };
  }
}
