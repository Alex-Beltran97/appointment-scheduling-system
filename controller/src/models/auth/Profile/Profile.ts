import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserRole } from '../UserRole/UserRole';
import { DocType } from '../DocType/DocType';

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

  @Column()
  cityCode!: string;

  @Column({unique: true})
  email!: string;

  @ManyToOne(() => DocType, docType => docType.profiles)
  @JoinColumn({name: 'docType_id'})
  docType!: DocType;

  @Column()
  docNum!: number;

  @Column()
  nitCode!: string;

  @Column()
  employeeCode!: string;

  @Column()
  username!: string;
  
  @Column()
  password!: string;
  
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

