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
import { Payment } from './payment.entity';

@Entity('product')
@Index(['name', 'body'], { fulltext: true, parser: 'ngram' })
@Index(['id', 'sale_price'])
@Index(['id', 'user_id'])
export class Product {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('int', { unsigned: true })
    user_id: number;

    @Column()
    name: string;

    @Column()
    intro: string;

    @Column({ nullable: true })
    thumbnail: string;

    @Column('enum', { enum: Category, default: Category.Others })
    category: Category;

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

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    start_on: Date;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    end_on: Date;

    @Column('tinyint')
    weekday: number;

    @Column('time')
    start_at: string;

    @Column('time')
    end_at: string;

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
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;

    @OneToMany(() => ProductImage, (productImage) => productImage.product)
    images: ProductImage[];

    @OneToMany(() => Inquiry, (inquiry) => inquiry.product)
    inquiries: Inquiry[];

    @OneToMany(() => Comment, (comment) => comment.product)
    comment: Relation<Comment>[];

    @OneToMany(() => Livecast, (livecast) => livecast.product)
    livecasts: Relation<Livecast>[];

    @OneToMany(() => Payment, (payment) => payment.product)
    payments: Relation<Payment>[];
}
