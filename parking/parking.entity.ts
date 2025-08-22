import { IsNotEmpty } from 'class-validator';
import { parking_status_type, parking_type, payment_status_type } from 'src/Custom.dataType';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parking')
export class Parking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique:true})
  @IsNotEmpty()
  parking_id: string;


  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  parking_type:parking_type; 


  @Column({ type:'varchar'})
  @IsNotEmpty()
  parking_rent: number;

  @Column({type:'varchar'})
  @IsNotEmpty()
  parking_status: parking_status_type; 


  @Column({type:'varchar', nullable:true})
  reserved_by:string | null; 

  @Column({type:'date', nullable:true})
  reserved_date:Date| null; 

  @Column({type:'varchar', nullable:true})
  payment_status:payment_status_type | null; 


}