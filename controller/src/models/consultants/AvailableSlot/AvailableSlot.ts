// entities/available-slot.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Profile } from '../../auth';
import { ConsultantService } from '../ConsultantService/ConsultantService';

@Entity({ name: 'available_slots', schema: 'consultant' })
export class AvailableSlot {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Profile, profile => profile.availableSlots)
  @JoinColumn({ name: 'consultant_id' })
  consultant!: Profile;

  @ManyToOne(() => ConsultantService, service => service.availableSlots)
  @JoinColumn({ name: 'service_id' })
  service!: ConsultantService;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'time with time zone' })
  start_time!: string;

  @Column({ type: 'time with time zone' })
  end_time!: string;

  @Column({ default: false })
  is_booked!: boolean;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
}
