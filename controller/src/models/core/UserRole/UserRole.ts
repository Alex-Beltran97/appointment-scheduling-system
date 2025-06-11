import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Profile } from '../Profile/Profile';

@Entity({ schema: 'core', name: 'user_role' })
export class UserRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  role!: string;
  
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @OneToMany(() => Profile, profile => profile.userRole)
  profiles!: Profile[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

