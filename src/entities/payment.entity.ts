import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {PayStatus} from '../enum/PayStatus'

@Entity('payment')
export class Payment {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('number',{unsigned: true})
	user_id: number
	
	@Column('number',{unsigned: true})
	product_id: number
	
	@Column('number',{unsigned: true})
	pay_method_id: number
	
	@Column('number',{unsigned: true})
	spending: number
	
	@Column('number',{unsigned: true})
	count: number
	
	@Column('number',{unsigned: true})
	mileage: number
	
	@Column({default: 'Pending'})
	status: PayStatus
	
	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}