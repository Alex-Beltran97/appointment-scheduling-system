import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Employee } from '../Employee/Employee';

@Entity({ schema: 'core', name: 'employee_role' })
export class EmployeeRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employeeRole!: string;
  
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @OneToMany(() => Employee, (employee) => employee.employeeRole)
  employees!: Employee[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

