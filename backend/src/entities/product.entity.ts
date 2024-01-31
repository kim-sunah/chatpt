import {
    Index,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
    Relation,
} from 'typeorm';
import { Category } from '../enum/Category';
import { ProductStatus } from '../enum/ProductStatus';
import { User } from './user.entity';
import { ProductImage } from './product-image.entity';
import { Inquiry } from './inquiry.entity';
import { Comment } from './comment.entity';
import { Livecast } from './livecast.entity';

@Entity('product')
@Index(['name', 'host_name', 'body'], { fulltext: true, parser: 'ngram' })
@Index(['id', 'host_name', 'sale_price'])
export class Product {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('int', { unsigned: true })
    user_id: number;

    @Column()
    host_name: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    thumbnail: string;

    @Column('enum', { enum: Category, default: Category.Others })
    category: Category;

    @Column('enum', { enum: ProductStatus, default: ProductStatus.Salable })
    @Index()
    status: ProductStatus;

    @Column({ nullable: true })
    shorts: string;

    @Column('int', { unsigned: true })
    price: number;

    @Column('int', { unsigned: true })
    @Index()
    sale_price: number;

    @Column('text', { nullable: true })
    body: string;

    @Column('int', { unsigned: true, default: 5 })
    capacity: number;

    @Column('int', { unsigned: true, default: 5 })
    @Index()
    vacancy: number;

    @Column('int', { unsigned: true, default: 0 })
    rating_count: number;

    @Column('int', { unsigned: true, default: 0 })
    rating_total: number;

    @Column('int', { unsigned: true, default: 0 })
    sales_volume: number;

    @Column('bigint', { unsigned: true, default: 0 })
    revenue: number;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    start_on: Date;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    end_on: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @Column('boolean', { default: false })
    @Index()
    accepted: boolean;

    @ManyToOne(() => User, (user) => user.products, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn([
        { name: 'user_id', referencedColumnName: 'id' },
        { name: 'host_name', referencedColumnName: 'nickname' },
    ])
    user: User;

    @OneToMany(() => Livecast, (livecast) => livecast.hostInfo)
    livecast: Relation<Livecast>[];

    @OneToMany(() => ProductImage, (productImage) => productImage.product)
    images: ProductImage[];

    @OneToMany(() => Inquiry, (inquiry) => inquiry.product)
    inquiries: Inquiry[];

    @OneToMany(() => Comment, (comment) => comment.product)
    comment: Relation<Comment>[];
}
