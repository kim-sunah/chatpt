import {Column, Index, PrimaryGeneratedColumn, Entity} from 'typeorm'

@Entity('badword')
export class Badword {
	@PrimaryGeneratedColumn({unsigned: true})
    id: number;
	
	@Column()
	@Index({ unique: true })
	badword: string
}