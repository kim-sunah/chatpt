import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Relation,
} from 'typeorm';
import { Product } from './product.entity';
import { Livecast } from './livecast.entity';

@Entity('product_image')
export class ProductImage {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('int', { unsigned: true })
    product_id: number;

    @Column()
    original_url: string;

    @Column({ nullable: true })
    server_url: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => Product, (product) => product.images)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @OneToMany(() => Livecast, (livecast) => livecast.hostInfo)
    livecast: Relation<Livecast>[];
}
