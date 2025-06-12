import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Payment } from '../Payment/Payment';

@Entity({ schema: 'core', name: 'suscription' })
export class Suscription {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;
  
  @Column({type: 'timestamp with time zone'})
  start_date!: Date;
  
  @Column({type: 'timestamp with time zone'})
  end_date!: Date;

  @ManyToOne(() => Payment, payment => payment.suscriptions)
  @JoinColumn({name: 'payment_id'})
  payment!: Payment;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

