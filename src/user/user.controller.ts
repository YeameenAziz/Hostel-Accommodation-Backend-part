import { Body, ConflictException, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { RegisterUserDto } from './register-user.dto';
import { LoginUserDto } from './login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../roles.guard';
import { JwtAuthGuard } from '../jwt-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Get all users (Admin only)
  @Get()
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getAllUsers() {
    return this.userService.getAll_Users();
  }

  // Search a user by user_ID (Admin or Manager)
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  async searchUser(@Param('id') user_id: string) {
    const user = await this.userService.getSearchUser(user_id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  // Register a new user
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  async register(@Body() registerDto: RegisterUserDto) {
    const { email, password, user_id, role } = registerDto;

    const existingUser = await this.userService.getSearchUser(user_id);
    if (existingUser) {
      throw new ConflictException('User ID already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.addNewUser({
      ...registerDto,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: newUser.Data.id, email: newUser.Data.email, role: newUser.Data.role });

    return {
      message: 'User registered successfully',
      userId: newUser.Data.id,
      accessToken: token,
    };
  }

  // User login
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  async login(@Body() loginDto: LoginUserDto) {
    const { email, password } = loginDto;
  
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    // Ensure the token has an appropriate expiry time, e.g., 1 hour
    const token = this.jwtService.sign(
      { id: user.id, email: user.email, role: user.role },
      { expiresIn: '1h' }
    );
  
    return {
      message: 'Login successful',
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };
  }
  
  // Update user details by user_ID (Admin only)
  @Put('update/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  async updateUser(
    @Param('id') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(user_id, updateUserDto);
    if (!updatedUser) {
      throw new UnauthorizedException('User not found or failed to update');
    }
    return updatedUser;
  }

  // Delete user by user_ID (Admin only)
  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async deleteUser(@Param('id') user_id: string) {
    const deleted = await this.userService.deleteUser(user_id);
    if (!deleted) {
      throw new UnauthorizedException('User not found or failed to delete');
    }
    return { message: 'User deleted successfully' };
  }
}
