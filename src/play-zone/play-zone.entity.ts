import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('play_zone')
export class PlayZone {
  @PrimaryGeneratedColumn()
  id: number;  // Play Zone ID

  @Column({ type: 'varchar', length: 100 })
  user_id: string;  // Unique user identifier

  @Column({ type: 'varchar', length: 100 })
  username: string;  // Username of the user wanting to enjoy the play zone

  @Column({ type: 'varchar', length: 100 })
  play_type: string;  // Type of play zone (e.g., Indoor, Outdoor, Arcade, etc.)

  @Column({ type: 'boolean', default: true })
  reservation_status: boolean;  // Reservation status (true = reserved, false = not reserved)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reservation_time: Date;  // Time when the user reserved the play zone

}
