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

@Entity('user_info')
export class UserInfo {
	@PrimaryGeneratedColumn({ unsigned: true })
    id: number;
	
	@Column('int', { unsigned: true })
    user_id: number;
	
	@Column('enum', { enum: Category, default: Category.Others })
    category: Category
	
	@Column('text',{nullable: true})
	note: string
	
	@Column({nullable: true})
	thumbnail: string
	
	@OneToOne(() => User)
	@JoinColumn({name: 'user_id'})
	user: User
}