import { IsString, IsEmail, IsNotEmpty, IsOptional, Length, Matches, IsAlphanumeric } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 15)
  @Matches(/^[0-9]+$/, {
    message: 'Mobile number must contain only digits.',
  })
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  permanent_address: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/, {
    message: 'Password must have at least one uppercase letter, one number, and one special character.',
  })
  
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  first_name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  last_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(10, 15)
  @Matches(/^[0-9]+$/, {
    message: 'Mobile number must contain only digits.',
  })
  mobile_number?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  permanent_address?: string;

  @IsOptional()
  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/, {
    message: 'Password must have at least one uppercase letter, one number, and one special character.',
  })
  
  password?: string;
}
