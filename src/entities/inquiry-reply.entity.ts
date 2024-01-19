import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity('inquiry_reply')
export class InquiryReply {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('number',{unsigned: true})
	user_id: number
	
	@Column('number',{unsigned: true})
	inquiry_id: number
	
	@Column('text')
	body: string
	
	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}