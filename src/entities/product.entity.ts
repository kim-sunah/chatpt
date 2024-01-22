import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {Category} from '../enum/Category'
import {ProductStatus} from '../enum/ProductStatus'

@Entity('product')
export class Product {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('number',{unsigned: true})
	user_id: number
	
	@Column()
    name : string
	
	@Column()
    category : Category
	
	@Column({default: 'Salable'})
	status: ProductStatus
	
	@Column('text',{nullable: true})
    body : string
	
	@Column('number',{unsigned: true})
    price : string
	
	@Column('int',{unsigned: true})
    sale_price : number
	
	@Column('int',{unsigned: true, default: 0})
    rating_count : number
	
	@Column('int',{unsigned: true, default: 0})
    rating_total : number
	
	@Column('int',{unsigned: true, default: 0})
	sales_volume : number
	
	@Column('bigint',{unsigned: true, default: 0})
	revenue : number

	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}