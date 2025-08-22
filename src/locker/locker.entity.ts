import { IsEmpty, IsNotEmpty } from 'class-validator';
import { LockerSizeType, LockerStatusType, paymentStatusType } from '../Custom.dataType';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locker')
export class Locker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique:true})
  @IsNotEmpty()
  locker_id: string;

  @Column({ type: 'varchar'})
  @IsNotEmpty()
  locker_size: LockerSizeType; 

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  locker_status: LockerStatusType; 

  @Column({ type: 'varchar' })
  locker_rent_price: number; 

  @Column({ type: 'varchar', length: 100, nullable:true })
  locker_rent_by: string | null; 


  @Column({ type: 'date',nullable:true})
  locker_rent_date: Date | null; 


  @Column({ type: 'varchar', nullable:true })
  payment_status: paymentStatusType| null; 

}