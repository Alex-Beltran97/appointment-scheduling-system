import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Suscription } from '../Suscription/Suscription';
import { PaymentStatus } from '../PaymentStatus/PaymentStatus';
import { Company } from '../Company/Company';
import { Plan } from '../Plan/Plan';

@Entity({ schema: 'core', name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'timestamp with time zone', default: () => 'NOW()'})
  payment_date!: Date;
  
  @Column()
  amount!: number;
  
  @ManyToOne(() => PaymentStatus, paymentStatus => paymentStatus.payments)
  @JoinColumn({name: 'paymentStatus_id'})
  paymnet_status!: PaymentStatus;
  
  @ManyToOne(() => Company, company => company.payments)
  @JoinColumn({name: 'company_id'})
  company!: Company;
  
  @ManyToOne(() => Plan, plan => plan.payments)
  @JoinColumn({name: 'plan_id'})
  plan!: Plan;

  @OneToMany(() => Suscription, suscription => suscription.payment)
  suscriptions!: Suscription[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

