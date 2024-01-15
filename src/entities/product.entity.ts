import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm'
import {Category} from '../enum/Category'
import {ProductStatus} from '../enum/ProductStatus'
import {User} from './user.entity'
import {ProductImage} from './product-image.entity'

@Entity('product')
export class Product {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('int',{unsigned: true})
	user_id: number
	
	@Column()
    name : string
	
	@Column('enum',{enum: Category, default: Category.Others})
    category : Category
	
	@Column('enum',{enum: ProductStatus, default: ProductStatus.Salable})
	status: ProductStatus
	
	@Column('text',{nullable: true})
    body : string
	
	@Column('int',{unsigned: true})
    price : number
	
	@Column('int',{unsigned: true})
    sale_price : number
	
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
	
	@ManyToOne(() => User, user => user.products)
	@JoinColumn({name: 'user_id'})
	user: User
	
	@OneToMany(() => ProductImage, productImage => productImage.product)
	images: ProductImage[]
}