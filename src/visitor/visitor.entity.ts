import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate,IsNotEmpty, Matches } from 'class-validator';

@Entity('visitor')
export class Visitor {

  // Auto Generate Id, 
  @PrimaryGeneratedColumn()
  visitor_id: number;


  // entry_Date 
  @Column({ type: 'date'})
  @IsNotEmpty({message : 'Date is required'})
  @IsDate({ message: 'Invalid date format. Use YYYY-MM-DD.' })
  entry_Date: Date;


  // Entry_time 
  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty({message : "Entry time is required!"})
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Invalid time format. Use HH:MM (24-hour format).',
  })
  entry_time: string;


  // Visitor_Name
  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty({message : 'Visitor Name is required'})
  visitor_name: string;



  // Phone_No Validation, 
  @Column({ type: 'varchar', length: 15 })
  @IsNotEmpty({message:"Phone No is required!"})
  @Matches(/^\+?[0-9]{7,15}$/, { message: 'Invalid phone number format.' })
  phone_no: string;


  // Visit Reason, 
  @Column({type:'varchar', length: 200})
  visit_reason: string; 
}