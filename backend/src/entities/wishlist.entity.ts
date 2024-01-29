import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique} from 'typeorm'
import { User } from './user.entity'
import { Product } from './product.entity'

@Entity('wishlist')
@Unique(['user_id','product_id'])
export class Wishlist {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('int',{unsigned: true})
	user_id: number
	
	@Column('int',{unsigned: true})
	product_id: number
	
	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
	
	@ManyToOne(() => User, {onDelete: 'CASCADE'})
	@JoinColumn({name: 'user_id'})
	user: User
	
	@ManyToOne(() => Product, {onDelete: 'CASCADE'})
	@JoinColumn({name: 'product_id'})
	product: Product
}