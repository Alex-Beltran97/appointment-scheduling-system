import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "../../auth";
import { NotificationType } from "../NotificationType/NotificationType";

@Entity({ name: 'notification', schema: 'consultant' })
export class ConsultantNotification {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Profile, profile => profile.notifications, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'consultant_id' })
  consultant!: Profile;
  
  @ManyToOne(() => NotificationType, notificationType => notificationType.notifications, {
    onDelete: 'RESTRICT'
  })
  @JoinColumn({ name: 'notification_type_id' })
  notificationType!: NotificationType;

  @Column('text')
  message!: string;

  @Column({type: 'boolean', default: false})
  is_readed!: boolean;

  @CreateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  created_at!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'NOW()'})
  updated_at!: Date;  
}
