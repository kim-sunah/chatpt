import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {LiveStatus} from '../enum/LiveStatus'

@Entity('livecast')
export class Livecast {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('int',{unsigned: true})
	host_id: number
	
	@Column('int',{unsigned: true})
	product_id: number

	@Column('enum',{enum:LiveStatus, default:0})
	status: LiveStatus
	
	@Column()
	url: string
	
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