import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { DocType } from '../DocType/DocType';
import { EmployeeRole } from '../EmployeeRole/EmployeeRole';
import { Contract } from '../Contract/Contract';

@Entity({ schema: 'core', name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column()
  secondLastName!: string;
  
  @Column({name: 'birth_date', type: 'timestamp with time zone'})
  birthDate!: Date;
  
  @Column({unique: true})
  email!: string;

  @Column()
  phone!: string;
  
  @ManyToOne(()=> DocType, (docType) => docType.employees)
  @JoinColumn({ name: 'docType_id' })
  docType!: DocType;
  
  @Column()
  docNum!: number;
  
  @ManyToOne(()=> EmployeeRole, (employeeRole) => employeeRole.employees)
  @JoinColumn({ name: 'employeeRole_id' })
  employeeRole!: EmployeeRole;

  @OneToOne(() => Contract, contract => contract.employee)
  constract!: Contract;
  
  @Column()
  employeeCode!: string;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

