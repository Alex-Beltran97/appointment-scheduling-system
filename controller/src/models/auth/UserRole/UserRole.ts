import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Employee } from '../Employee/Employee';

@Entity({ schema: 'auth', name: 'user_role' })
export class UserRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  role!: string;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

