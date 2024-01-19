import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {InquiryStatus} from '../enum/InquiryStatus'

@Entity('inquiry')
export class Inquiry {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('int',{unsigned: true})
	user_id: number
	
	@Column('int',{nullable: true, unsigned: true})
	product_id: number
	
	@Column('text')
	body: string
	
	@Column('enum',{enum:InquiryStatus, default:0})
	status: InquiryStatus
	
	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}