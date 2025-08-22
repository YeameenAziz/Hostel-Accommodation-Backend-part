import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('laundry')
export class Laundry {
  @PrimaryGeneratedColumn()
  id: number;  // Laundry reservation ID

  @Column({ type: 'varchar', length: 100 })
  user_id: string;  // Unique user identifier

  @Column({ type: 'varchar', length: 100 })
  username: string;  // Username of the user wanting to use the laundry service

  @Column({ type: 'varchar', length: 100 })
  laundry_type: string;  // Type of laundry service (e.g., Washing, Dry Cleaning, Ironing)

  @Column({ type: 'boolean', default: true })
  reservation_status: boolean;  // Reservation status (true = reserved, false = not reserved)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reservation_time: Date;  // Time when the user reserved the laundry service

  @Column({ type: 'varchar', length: 100 })
  items: string;  // Items being sent for laundry (e.g., Clothes, Bedding, etc.)

  @Column({ type: 'varchar', length: 50 })
  delivery_method: string;  // Delivery method (e.g., Pickup, Self-collection)

  @Column({ type: 'varchar', length: 100, nullable: true })
  notes: string;  // Optional additional notes (e.g., special washing instructions)

}
