import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Profile } from '../Profile/Profile';

@Entity({ schema: 'auth', name: 'profile_img' })
export class ProfileImg {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mime!: string;
  
  @Column({ type: 'bytea' })
  data!: Uint8Array;

  @OneToMany(() => Profile, profile => profile.profileImg)
  profiles!: Profile[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
};

