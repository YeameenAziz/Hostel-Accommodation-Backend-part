import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gym')
export class Gym {
  @PrimaryGeneratedColumn()
  id: number;  // Gym ID

  @Column({ type: 'varchar', length: 100 })
  gym_id: string;  // Unique gym identifier of user

  @Column({ type: 'varchar', length: 100 })
  user_name: string;  // Name of the user

  @Column({ type: 'varchar', length: 100, unique: true })
  users_email: string;  // User's email address

  @Column({ type: 'varchar', length: 100 })
  trainer_name: string;  // Name of the trainer for that user

  @Column({ type: 'boolean', default: true })
  payment_status: boolean;  // Payment status (true = successful, false = failed)

}