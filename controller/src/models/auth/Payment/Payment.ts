import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Suscription } from '../Suscription/Suscription';
import { PaymentStatus } from '../PaymentStatus/PaymentStatus';

@Entity({ schema: 'auth', name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @ManyToOne(() => Suscription, suscription => suscription.payments)
  @JoinColumn({name: 'suscription_id'})
  suscription!: Suscription;
  
  @Column({type: 'timestamp with time zone', default: () => 'NOW()'})
  payment_date!: Date;
  
  @Column()
  amount!: number;
  
  @ManyToOne(() => PaymentStatus, paymentStatus => paymentStatus.payments)
  @JoinColumn({name: 'paymentStatus_id'})
  paymnet_status!: PaymentStatus;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

