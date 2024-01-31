import {
	Index,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn
} from 'typeorm'
import { User } from './user.entity'
import { Category } from '../enum/Category'

@Entity('host_info')
export class HostInfo {
	@PrimaryGeneratedColumn({ unsigned: true })
    id: number;
	
	@Column('int', { unsigned: true })
    host_id: number;
	
	@Column({nullable: true})
	thumbnail: string
	
	@Column('enum', { enum: Category, default: Category.Others })
    category: Category
	
	@Column('text')
	experience: string
	
	@Column()
	military: string
	
	@Column()
	address: string
	
	@Column({nullable: true})
	social_url: string
	
	@OneToOne(() => User)
	@JoinColumn({name: 'host_id'})
	host: User
}