import { IsNotEmpty, IsDateString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateStaffDto {

  @PrimaryGeneratedColumn()
  id : number; 

  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Staff ID cannot be empty' })
  staffId: string;

  @IsNotEmpty({ message: 'Payment details cannot be empty' })
  paymentDetails: string;

  @IsNotEmpty({ message: 'Joining date cannot be empty' })
  @IsDateString({}, { message: 'Joining date must be a valid date' })
  joiningDate: string;
}