import { IsEmpty, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateGroceryDto {
@IsNumber({}, { message: 'Quantity must be a String' })
  @IsEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be a positive number' })
  price: number;

  @IsEmpty({ message: 'Category cannot be empty' })
  category: string;

  @IsEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0, { message: 'Quantity must be a positive number' })
  quantity: number;
}