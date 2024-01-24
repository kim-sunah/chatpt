import {Column, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import {User} from './user.entity'
import {Inquiry} from './inquiry.entity'

@Entity('inquiry_reply')
@Index(['inquiry_id','createdAt'])
export class InquiryReply {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('int',{unsigned: true})
	user_id: number
	
	@Column('int',{unsigned: true})
	inquiry_id: number
	
	@Column('text')
	body: string
	
	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
	
	@ManyToOne(() => User, user => user.inquiryReplies)
	@JoinColumn({name: 'user_id'})
	user: User
	
	@ManyToOne(() => Inquiry, inquiry => inquiry.replies)
	@JoinColumn({name: 'inquiry_id'})
	inquiry: Inquiry
}