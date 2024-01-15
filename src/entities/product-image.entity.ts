import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity('product_image')
export class ProductImage {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('number',{unsigned: true})
	product_id: number
	
	@Column()
	original_url: string
	
	@Column({nullable: true})
	server_url: string

	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}