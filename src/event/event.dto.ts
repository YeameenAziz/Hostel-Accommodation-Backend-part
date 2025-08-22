import { IsString, IsDate, IsOptional } from 'class-validator';

export class EventDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  @IsOptional() // optional if you don't always want to include a date
  eventDate?: Date;

  @IsString()
  @IsOptional() // optional field, for example, location
  location?: string;
}