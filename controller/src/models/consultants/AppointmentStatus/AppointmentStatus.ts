import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Appointment } from '../Appointment/Appointment';

@Entity({ name: 'appointment_status', schema: 'consultant' })
export class AppointmentStatus {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  status!: string;

  @OneToMany(() => Appointment, appointment => appointment.status)
  appointments!: Appointment[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
}
