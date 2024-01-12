import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity('comment')
export class Comment {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('number',{unsigned: true})
	product_id: number
	
	@Column('number',{unsigned: true})
	user_id: number
	
	@Column('text',{nullable: true})
	body: string
	
	@Column('tinyint',{unsigned: true, default: 10})
	rating: number

	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}