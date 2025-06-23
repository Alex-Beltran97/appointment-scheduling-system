// entities/appointment.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Profile } from '../../auth';
import { ConsultantService } from '../ConsultantService/ConsultantService';
import { AppointmentStatus } from '../AppointmentStatus/AppointmentStatus';

@Entity({ name: 'appointments', schema: 'consultant' })
export class Appointment {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Profile, profile => profile.appointments)
  @JoinColumn({ name: 'consultant_id' })
  consultant!: Profile;

  @ManyToOne(() => ConsultantService, service => service.appointments)
  @JoinColumn({ name: 'service_id' })
  service!: ConsultantService;

  @Column({ name: 'client_full_name', length: 225 })
  clientFullName!: string;

  @Column('varchar', { array: true })
  client_email!: string[];

  @Column('varchar', { array: true })
  client_phone!: string[];

  @Column()
  date!: Date;

  @Column({ type: 'time with time zone' })
  start_time!: string;

  @Column({ type: 'time with time zone' })
  end_time!: string;

  @Column({ type: 'text', nullable: true })
  notes!: string;

  @ManyToOne(() => AppointmentStatus, status => status.appointments)
  @JoinColumn({ name: 'status_id' })
  status!: AppointmentStatus;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
}
