import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity('live_comment')
export class LiveComment {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column('number',{unsigned: true})
	live_id: number
	
	@Column('number',{unsigned: true})
	user_id: number
	
	@Column()
	body: string

	@CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}