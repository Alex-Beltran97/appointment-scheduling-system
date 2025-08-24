import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserRole } from '../UserRole/UserRole';
import { DocType } from '../../core/DocType/DocType';
import { ConsultantService } from '../../consultants/ConsultantService/ConsultantService';
import { Appointment } from '../../consultants/Appointment/Appointment';
import { ConsultantNotification } from '../../consultants';
import { ProfileImg } from '../ProfileImg/ProfileImg';

@Entity({ schema: 'auth', name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserRole, userRole => userRole.profiles, {
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'userRole_id'})
  userRole!: UserRole;
  
  @ManyToOne(() => ProfileImg, profileImg => profileImg.profiles, {
    onDelete: 'CASCADE',
    nullable: true
  })
  @JoinColumn({name: 'profile_img_id'})
  profileImg!: ProfileImg;

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

  @ManyToOne(() => DocType, docType => docType.profiles, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'docType_id'})
  docType!: DocType;

  @Column({unique: true})
  docNum!: number;

  @Column()
  nitCode!: string;

  @Column({ unique: true })
  username!: string;
  
  @Column()
  password!: string;
  
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @OneToMany(() => ConsultantService, service => service.consultant)
  services!: ConsultantService[];

  @OneToMany(() => Appointment, appointment => appointment.consultant)
  appointments!: Appointment[];
  
  @OneToMany(() => ConsultantNotification, consultantNotification => consultantNotification.consultant)
  notifications!: ConsultantNotification[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

