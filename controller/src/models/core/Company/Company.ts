import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Contract } from '../Contract/Contract';
import { Payment } from '../Payment/Payment';

@Entity({ schema: 'core', name: 'company' })
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
  
  @Column()
  nit_code!: string;
  
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @OneToMany(() => Contract, contract => contract.company)
  contracts!: Contract[];
  
  @OneToMany(() => Payment, payment => payment.company)
  payments!: Payment[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

