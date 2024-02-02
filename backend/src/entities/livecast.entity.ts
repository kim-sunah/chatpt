import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Index,
    OneToMany,
} from 'typeorm';
import { LiveStatus } from '../enum/LiveStatus';
import { Product } from '../entities/product.entity';
import { Payment } from './payment.entity';

@Entity('livecast')
@Index(['product_id', 'start_time'])
export class Livecast {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('int', { unsigned: true })
    host_id: number;

    @Column('int', { unsigned: true })
    product_id: number;

    @Column('enum', { enum: LiveStatus, default: 0 })
    status: LiveStatus;

    @Column()
    name: string;

    @Column({ default: '' })
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

    @ManyToOne(() => Product, (product) => product.livecasts, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn([
        { name: 'product_id', referencedColumnName: 'id' },
        { name: 'host_id', referencedColumnName: 'user_id' },
    ])
    product: Product;
}
