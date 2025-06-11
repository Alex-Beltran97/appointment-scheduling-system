import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'auth', name: 'suscription' })
export class Suscription {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;
  
  @Column()
  plan_id!: number;
  
  @Column()
  is_active!: boolean;
  
  @Column({type: 'timestamp with time zone'})
  start_date!: Date;
  
  @Column({type: 'timestamp with time zone'})
  end_date!: Date;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

