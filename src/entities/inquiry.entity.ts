import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {InquiryStatus} from '../enum/InquiryStatus'

@Entity('inquiry')
export class Inquiry {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('number',{unsigned: true})
	user_id: number
	
	@Column('number',{nullable: true, unsigned: true})
	product_id: number
	
	@Column('text')
	body: string
	
	@Column({default:'Pending'})
	status: InquiryStatus
	
	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}