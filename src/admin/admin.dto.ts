import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()    
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
 
 
  @Matches(/(?=.*[a-zA-Z])(?=.*\d)/, { message: 'Password must contain at least one letter and one number' })
  password: string;
}