import {Column, Index, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import {InquiryStatus} from '../enum/InquiryStatus'
import {Product} from './product.entity'
import {User} from './user.entity'
import {InquiryReply} from './inquiry-reply.entity'

@Entity('inquiry')
@Index(['product_id','status'])
@Index(['status','createdAt'])
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
	
	@OneToMany(() => InquiryReply, inquiryReply => inquiryReply.inquiry)
	replies: InquiryReply[]
	
	@ManyToOne(() => User, user => user.inquiries)
	@JoinColumn({name: 'user_id'})
	user: User
	
	@ManyToOne(() => Product, product => product.inquiries)
	@JoinColumn({name: 'product_id'})
	product?: Product | null
}