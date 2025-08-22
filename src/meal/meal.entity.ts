import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('meal')
export class Meal {
  @PrimaryGeneratedColumn()
  mealId: number;

  @Column({ type: 'varchar', length: 100 })
  mealPackageName: string;

  @Column('decimal')
  mealPrice: number;

  @Column({ type: 'text', nullable: true })
  mealDetails: string;
}