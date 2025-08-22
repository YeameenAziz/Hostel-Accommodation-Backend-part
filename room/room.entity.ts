import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  room_id: string;

  @Column({ type: 'varchar', length: 50 })
  room_type: string;

  @Column({ type: 'decimal' })
  room_price: number;

  @Column({ type: 'int' })
  rent_month: number;

  @Column({ type: 'int' })
  seat_num: number;

  @Column({ type: 'varchar', length: 3 })
  attached_washRoom: string;

  @Column({ type: 'varchar', length: 3 })
  attached_balcony: string;
}
