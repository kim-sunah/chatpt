import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Relation,
	Unique
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('int', { unsigned: true })
    product_id: number;

    @Column('int', { unsigned: true })
    user_id: number;

    @Column('text', { nullable: true })
    body: string;

    @Column('tinyint', { unsigned: true, default: 10 })
    rating: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => User, (user) => user.comment, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    user: Relation<User>;

    @ManyToOne(() => Product, (product) => product.comment, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    product: Relation<Product>;
}
