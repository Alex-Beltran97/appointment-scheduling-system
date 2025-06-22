import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserRole } from '../UserRole/UserRole';
import { DocType } from '../../core/DocType/DocType';
import { Service } from '../../consultants/Service/Service';
import { ConsultantAvailability } from '../../consultants/ConsultantAvailability/ConsultantAvailability';
import { ConsultantException } from '../../consultants/ConsultantException/ConsultantException';
import { AvailableSlot } from '../../consultants/AvailableSlot/AvailableSlot';
import { Appointment } from '../../consultants/Appointment/Appointment';

@Entity({ schema: 'auth', name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserRole, userRole => userRole.profiles)
  @JoinColumn({name: 'userRole_id'})
  userRole!: UserRole;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column()
  secondLastName!: string;

  @Column({name: 'birth_date', type: 'timestamp with time zone'})
  birthDate!: Date;

  @Column()
  phone!: string;

  @Column()
  countryCode!: string;

  @Column({nullable: true})
  departmentCode!: string;
  
  @Column({nullable: true})
  cityCode!: string;

  @Column({unique: true})
  email!: string;

  @ManyToOne(() => DocType, docType => docType.profiles)
  @JoinColumn({name: 'docType_id'})
  docType!: DocType;

  @Column({unique: true})
  docNum!: number;

  @Column()
  nitCode!: string;

  @Column()
  employeeCode!: string;

  @Column({ unique: true })
  username!: string;
  
  @Column()
  password!: string;
  
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @OneToMany(() => Service, service => service.consultant)
  services!: Service[];

  @OneToMany(() => Service, service => service.consultant)
  consultantAvailabilities!: ConsultantAvailability[];

  @OneToMany(() => ConsultantException, consultantException => consultantException.consultant)
  consultantExceptions!: ConsultantException[];

  @OneToMany(() => AvailableSlot, availableSlot => availableSlot.consultant)
  availableSlots!: AvailableSlot[];
  
  @OneToMany(() => Appointment, appointment => appointment.consultant)
  appointments!: Appointment[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

