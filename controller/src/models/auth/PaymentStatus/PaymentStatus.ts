import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Payment } from '../Payment/Payment';

@Entity({ schema: 'auth', name: 'payment_status' })
export class PaymentStatus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  status!: string;
  
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @OneToMany(() => Payment, payment => payment.paymnet_status)
  payments!: Payment[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};
