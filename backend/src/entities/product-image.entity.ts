import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import {Product} from './product.entity'

@Entity('product_image')
export class ProductImage {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('int',{unsigned: true})
	product_id: number
	
	@Column()
	original_url: string

	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
	
	@ManyToOne(() => Product, product => product.images)
	@JoinColumn({name: 'product_id'})
	product: Product
}