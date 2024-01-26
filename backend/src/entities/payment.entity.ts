import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
    Relation,
} from 'typeorm';
import { PayStatus } from '../enum/PayStatus';
import { Refund } from './refund.entity';

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('int', { unsigned: true })
    user_id: number;

    @Column('int', { unsigned: true })
    product_id: number;

    @Column('int', { unsigned: true })
    pay_method_id: number;

    @Column('int', { unsigned: true })
    spending: number;

    @Column('int', { unsigned: true })
    count: number;

    @Column('int', { unsigned: true })
    mileage: number;

    @Column('enum', { enum: PayStatus, default: PayStatus.Pending })
    status: PayStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @OneToOne(() => Refund, (refund) => refund.payment)
    refund: Relation<Refund>;
}
