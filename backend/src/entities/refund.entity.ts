import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Relation,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Payment } from './payment.entity';

@Entity('refund')
export class Refund {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('int', { unsigned: true })
    payment_id: number;

    @Column('int', { unsigned: true })
    amount: number;

    @Column('text', { nullable: true })
    body: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @OneToOne(() => Payment, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'payment_id' })
    payment: Relation<Payment>;
}
