import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('message')
export class Message {
  /**
   * 아이디
   * 참가자 1
   * 참가자 2
   * 메세지내용
   * createdAt
   * 보낸사람
   * 참가자 1 읽음유무
   * 참가자 2 읽음유무
   */
  //queue 이름
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  queue: string;

  //참가자 1
  @Column('int', { unsigned: true })
  gest_id: number;

  //참가자 2
  @Column('int', { unsigned: true })
  host_id: number;

  @Column()
  send_user: number;

  @Column()
  message: string;

  @Column({ default: 1 })
  is_read: boolean;

  @ManyToOne(() => User, (user) => user.host_message, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'host_id', referencedColumnName: 'id' })
  host: Relation<User>;

  @ManyToOne(() => User, (user) => user.gest_message, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'gest_id', referencedColumnName: 'id' })
  gest: Relation<User>;

  @CreateDateColumn()
  createdAt: Date;
}
