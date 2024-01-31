import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    Relation,
    JoinColumn,
} from 'typeorm';
import { LiveStatus } from '../enum/LiveStatus';
import { Payment } from './payment.entity';
import { Product } from './product.entity';
import { HostInfo } from './host-info.entity';

@Entity('livecast')
export class Livecast {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('int', { unsigned: true })
    host_id: number;

    @Column('int', { unsigned: true })
    product_id: number;

    @Column('int', { unsigned: true })
    payment_id: number;

    @Column('enum', { enum: LiveStatus, default: 0 })
    status: LiveStatus;

    @Column()
    url: string;

    @Column()
    start_time: Date;

    @Column()
    end_time: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => HostInfo, (hostInfo) => hostInfo.livecast)
    @JoinColumn({ name: 'host_id' })
    hostInfo: Relation<HostInfo>;

    @ManyToOne(() => Product, (product) => product.livecast)
    @JoinColumn({ name: 'product_id' })
    product: Relation<Product>;

    @ManyToOne(() => Payment, (payment) => payment.livecast)
    @JoinColumn({ name: 'livecast_id' })
    payment: Relation<Payment>;
}
