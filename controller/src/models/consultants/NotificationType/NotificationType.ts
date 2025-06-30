import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ConsultantNotification } from "../ConsultantNotification/ConsultantNotification";

@Entity({ name: 'notification_type', schema: 'consultant' })
export class NotificationType {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  status!: string;

  @OneToMany(() => ConsultantNotification, consultantNotification => consultantNotification.notificationType)
  notifications!: ConsultantNotification[];

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
}
