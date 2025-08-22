import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

@Entity('grocery')
export class Grocery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column('decimal')
  @IsNumber()
  @Min(0)
  price: number;

  @Column()
  @IsNotEmpty()
  category: string;

  @Column()
  @IsNumber()
  @Min(0)
  quantity: number;
}