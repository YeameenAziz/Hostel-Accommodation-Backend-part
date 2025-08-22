import { IsEmail, IsString, IsOptional, IsEnum, MinLength, MaxLength } from "class-validator";
import { UserRole } from "./user.entity"; // Import UserRole enum

export class RegisterUserDto {
  @IsString({ message: 'User ID must be a string' })
  @MaxLength(100, { message: 'User ID must not exceed 100 characters' })
  user_id: string;

  @IsString({ message: 'First name must be a string' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  first_name: string;

  @IsString({ message: 'Last name must be a string' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  last_name: string;

  @IsEmail({}, { message: 'Email format is not correct' })
  email: string;

  @IsString({ message: 'Mobile number must be a string' })
  @MaxLength(15, { message: 'Mobile number must not exceed 15 characters' })
  mobile_number: string;

  @IsString({ message: 'Permanent address must be a string' })
  @MaxLength(255, { message: 'Permanent address must not exceed 255 characters' })
  permanent_address: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  // Role property added
  @IsOptional() // Optional for flexibility
  @IsEnum(UserRole, { message: 'Role must be one of: admin, manager, user' }) // Validate against UserRole enum
  role?: UserRole = UserRole.USER; // Default role set to 'user'
}
