import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Employee } from '../Employee/Employee';
import { Profile } from '../../auth';

@Entity({ schema: 'core', name: 'docType' })
export class DocType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  docType!: string;

  @OneToMany(() => Employee, (employee) => employee.docType)
  employees!: Employee[];
  
  @OneToMany(() => Profile, profile => profile.docType)
  profiles!: Profile[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

