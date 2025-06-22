// entities/appointment.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Profile } from '../../auth';
import { Service } from '../Service/Service';
import { AppointmentStatus } from '../AppointmentStatus/AppointmentStatus';

@Entity({ name: 'appointments', schema: 'consultant' })
export class Appointment {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Profile, profile => profile.appointments)
  @JoinColumn({ name: 'consultant_id' })
  consultant!: Profile;

  @ManyToOne(() => Service, service => service.appointments)
  @JoinColumn({ name: 'service_id' })
  service!: Service;

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

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
}
