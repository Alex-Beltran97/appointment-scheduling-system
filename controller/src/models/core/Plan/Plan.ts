import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Suscription } from '../Suscription/Suscription';

@Entity({ schema: 'core', name: 'plan' })
export class Plan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
  
  @Column()
  price!: number;
  
  @Column()
  description!: string;
  
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @OneToMany(() => Suscription, suscription => suscription.plan)
  suscriptions!: Suscription[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

