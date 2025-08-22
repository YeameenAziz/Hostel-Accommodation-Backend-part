import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('staff')
export class Staff {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true }) // staffId should be unique
  staffId: string;

  @Column()
  paymentDetails: string;

  @Column({ type: 'date' }) // JoiningDate is a date type
  joiningDate: Date;
}