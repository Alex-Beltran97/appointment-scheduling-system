import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Company } from '../Company/Company';
import { Plan } from '../Plan/Plan';
import { Payment } from '../Payment/Payment';

@Entity({ schema: 'core', name: 'suscription' })
export class Suscription {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Company, company => company.suscriptions)
  @JoinColumn({name: 'company_id'})
  company!: Company;
  
  @ManyToOne(() => Plan, plan => plan.suscriptions)
  @JoinColumn({name: 'plan_id'})
  plan!: Plan;
  
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;
  
  @Column({type: 'timestamp with time zone'})
  start_date!: Date;
  
  @Column({type: 'timestamp with time zone'})
  end_date!: Date;

  @OneToMany(() => Payment, payment => payment.suscription)
  payments!: Payment[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

