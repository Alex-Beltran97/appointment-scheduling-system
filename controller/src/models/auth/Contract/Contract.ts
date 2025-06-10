import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Company } from '../Company/Company';
import { Employee } from '../Employee/Employee';

@Entity({ schema: 'auth', name: 'contract' })
export class Contract {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @ManyToOne(() => Company, company => company.contracts)
  @JoinColumn({name: 'company_id'})
  company!: Company;  

  @OneToOne(() => Employee, employee => employee.id)
  @JoinColumn({name: 'employee_id'})
  employee!: Employee;  

  @Column({type: 'boolean', default: true})
  is_active!: boolean;

  @CreateDateColumn({type: 'timestamp with time zone'})
  start_date!: Date;

  @CreateDateColumn({type: 'timestamp with time zone'})
  end_date!: Date;
  
  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

