import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'auth', name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  suscription_id!: number;
  
  @Column({type: 'timestamp with time zone'})
  payment_date!: Date;
  
  @Column()
  amount!: number;
  
  @Column()
  paymentStatus_id!: number;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

