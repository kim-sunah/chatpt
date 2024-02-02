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
    JoinColumn,
} from 'typeorm';
import { PayStatus } from '../enum/PayStatus';
import { Refund } from './refund.entity';
import { Product } from './product.entity';
import { Livecast } from './livecast.entity';
import { User } from './user.entity';

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
    mileage: number;

    @Column('enum', { enum: PayStatus, default: PayStatus.Pending })
    status: PayStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    @ManyToOne(() => Product, (product) => product.payments)
    @JoinColumn({ name: 'product_id' })
    product: Relation<Product>;

    @OneToOne(() => Refund, (refund) => refund.payment)
    refund: Relation<Refund>;
}
