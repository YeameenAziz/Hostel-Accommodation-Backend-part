import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('complain_box')
@Unique(['userId', 'date']) // Ensures one complaint per user per date
export class ComplainBox {
  @PrimaryGeneratedColumn() // Auto-generates an auto-incrementing integer
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'varchar', length: 255 }) // Represents the user making the complaint
  userId: string;
    length: number;
}
