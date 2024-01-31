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
//import { Refund } from './refund.entity';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Livecast } from './livecast.entity';

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('int', { unsigned: true })
    user_id: number;

    @Column('int', { unsigned: true })
    product_id: number;

    @Column()
    pay_method_id: string;

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

    // @OneToOne(() => Refund, (refund) => refund.payment)
    // refund: Relation<Refund>;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Relation<Product>;

    @OneToOne(() => Livecast)
    @JoinColumn({ name: 'livecast_id' })
    livecast: Relation<Livecast>;
}
