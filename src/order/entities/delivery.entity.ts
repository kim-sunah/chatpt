import {Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {DeliveryStatus} from '../../enum/DeliveryStatus'

@Entity('livecast')
export class Livecast {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('number',{unsigned: true})
	payment_id: number
	
	@Column()
	name: string
	
	@Column()
	address: string
	
	@Column()
	postcode: string
	
	@Column({nullable: true})
	contact: string
	
	@Column({default: '조심히 와주세요'})
	request: string

	@CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}