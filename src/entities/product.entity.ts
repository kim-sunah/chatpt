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
} from 'typeorm';
import { Category } from '../enum/Category';
import { ProductStatus } from '../enum/ProductStatus';
import { Comment } from './comment.entity';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('number', { unsigned: true })
    user_id: number;

    @Column()
    name: string;

    @Column()
    category: Category;

    @Column({ default: 'Salable' })
    status: ProductStatus;

    @Column('text', { nullable: true })
    body: string;

    @Column('number', { unsigned: true })
    price: string;

    @Column('number', { unsigned: true })
    sale_price: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @OneToMany(() => Comment, (comment) => comment.product)
    comment: Relation<Comment>[];
}
