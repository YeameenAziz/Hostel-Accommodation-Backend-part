import { IsString, IsNotEmpty, IsDateString, Validate } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { ComplainBoxService } from './complain-box.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueComplainPerDateConstraint implements ValidatorConstraintInterface {
  constructor(private readonly complainBoxService: ComplainBoxService) {}

  // Validates if the user has already made a complaint on the same date
  async validate(date: string, args: ValidationArguments) {
    const id = args.object['id']; // Extract the user ID from the DTO object
    const existingComplain = await this.complainBoxService.findByUserIdAndDate(id, date);
    return !existingComplain; // Return true if no complaint exists for the given ID and date
  }

  // Default error message for validation failure
  defaultMessage(args: ValidationArguments) {
    return `User with ID "${args.object['id']}" has already made a complaint on the given date.`;
  }
  
}

// DTO for creating a complaint
export class CreateComplainDto {
    @IsString()
    @IsNotEmpty()
    userId: string;  // User ID for the complaint
  
    @IsString()
    @IsNotEmpty()
    text: string;  // Complaint text content
  
    @IsDateString()
    @IsNotEmpty()
    @Validate(UniqueComplainPerDateConstraint) // Apply custom validation for unique complaints per date
    date: string;  // Complaint date
  }
  

// DTO for updating a complaint
export class UpdateComplainDto {
  @IsString()
  @IsNotEmpty()
  text: string; // Updated complaint text content
}
