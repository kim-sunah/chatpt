import {
  Column,
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
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column('int', { unsigned: true })
  gest_id: number;

  @Column('int', { unsigned: true })
  host_id: number;

  @Column({ default: 1 })
  gest_count: number;

  @Column({ default: 0 })
  host_count: number;

  @Column()
  last_message: string;
  @UpdateDateColumn()
  updatedAt: Date;

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
}
