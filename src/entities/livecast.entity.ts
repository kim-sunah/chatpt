import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {LiveStatus} from '../../enum/LiveStatus'

@Entity('livecast')
export class Livecast {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('number',{unsigned: true})
	host_id: number
	
	@Column('number',{unsigned: true})
	product_id: number

	@Column({default:'Pending'})
	status: LiveStatus
	
	@Column()
	start_time: Date
	
	@Column()
	end_time: Date
	
	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}