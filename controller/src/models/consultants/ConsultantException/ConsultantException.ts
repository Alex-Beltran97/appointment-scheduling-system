import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Profile } from '../../auth';
import { ConsultantService } from '../ConsultantService/ConsultantService';

@Entity({ name: 'consultant_exceptions', schema: 'consultant' })
export class ConsultantException {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => ConsultantService, service => service.consultantExceptions, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'service_id' })
  service!: ConsultantService;

  @Column()
  date!: Date;

  @Column({ type: 'time with time zone', nullable: true })
  start_time?: string;

  @Column({ type: 'time with time zone', nullable: true })
  end_time?: string;

  @Column({ type: 'text', nullable: true })
  reason?: string;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
    created_at!: Date;
  
  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
}
