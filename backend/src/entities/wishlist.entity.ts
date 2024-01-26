import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity('wishlist')
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
}