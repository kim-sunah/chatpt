import {
    Index,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    Relation,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from '../enum/Category';
import { Livecast } from './livecast.entity';

@Entity('host_info')
export class HostInfo {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('int', { unsigned: true })
    host_id: number;

    @Column({ nullable: true })
    thumbnail: string;

    @Column('enum', { enum: Category, default: Category.Others })
    category: Category;

    @Column('text')
    experience: string;

    @Column()
    military: string;

    @Column()
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @OneToOne(() => User)
    @JoinColumn({ name: 'host_id' })
    host: User;

    @OneToMany(() => Livecast, (livecast) => livecast.hostInfo)
    livecast: Relation<Livecast>[];
}
