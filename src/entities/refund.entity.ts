import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
    Relation,
} from 'typeorm';
import { Payment } from './payment.entity';

@Entity('refund')
export class Refund {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('number', { unsigned: true })
    payment_id: number;

    @Column('number', { unsigned: true })
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
