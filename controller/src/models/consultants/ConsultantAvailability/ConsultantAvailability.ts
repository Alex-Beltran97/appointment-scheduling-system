// entities/consultant-availability.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ConsultantService } from '../ConsultantService/ConsultantService';

@Entity({ name: 'consultant_availability', schema: 'consultant' })
export class ConsultantAvailability {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => ConsultantService, service => service.consultantAvailabilities)
  @JoinColumn({ name: 'service_id' })
  service!: ConsultantService;

  @Column()
  weekday!: number;

  @Column({ type: 'time with time zone' })
  start_time!: string;

  @Column({ type: 'time with time zone' })
  end_time!: string;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
}
