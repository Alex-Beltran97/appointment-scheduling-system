import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Contract } from '../Contract/Contract';
import { Suscription } from '../Suscription/Suscription';

@Entity({ schema: 'auth', name: 'company' })
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
  
  @Column()
  nit_code!: string;

  @OneToMany(() => Contract, contract => contract.company)
  contracts!: Contract[];
  
  @OneToMany(() => Suscription, suscription => suscription.company)
  suscriptions!: Suscription[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

