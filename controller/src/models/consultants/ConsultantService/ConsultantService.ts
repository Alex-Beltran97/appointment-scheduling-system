import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from '../../auth/Profile/Profile';
import { AvailableSlot } from '../AvailableSlot/AvailableSlot';
import { Appointment } from '../Appointment/Appointment';
import { ConsultantAvailability } from '../ConsultantAvailability/ConsultantAvailability';
import { ConsultantException } from '../ConsultantException/ConsultantException';

@Entity({ name: 'service', schema: 'consultant' })
export class ConsultantService {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Profile, profile => profile.services)
  @JoinColumn({ name: 'consultant_id' })
  consultant!: Profile;

  @Column({ length: 225 })
  name!: string;

  @Column('text')
  description!: string;

  @Column({ name: 'duration_minutes', type: 'int' })
  durationMinutes!: number;

  @Column('numeric', { precision: 10, scale: 2 })
  price!: number;

  @Column({ default: true })
  is_active!: boolean;

  @OneToMany(() => AvailableSlot, availableSlot => availableSlot.service)
  availableSlots!: AvailableSlot[];

  @OneToMany(() => Appointment, appointment => appointment.service)
  appointments!: Appointment[];

  @OneToMany(() => ConsultantAvailability, consultantAvailability => consultantAvailability.service)
  consultantAvailabilities!: ConsultantAvailability[];

  @OneToMany(() => ConsultantException, consultantException => consultantException.service)
  consultantExceptions!: ConsultantException[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
}
