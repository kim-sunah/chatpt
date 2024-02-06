import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import {
    Index,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    Relation,
} from 'typeorm';
import { Gender } from '../enum/Gender';
import { Role } from '../enum/Role';
import { Product } from './product.entity';
import { Inquiry } from './inquiry.entity';
import { InquiryReply } from './inquiry-reply.entity';
import { Comment } from './comment.entity';
import { HostInfo } from './host-info.entity';
import { UserInfo } from './user-info.entity';
import { Payment } from './payment.entity';

@Entity('users')
@Index(['id', 'nickname'])
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column()
    registration_information: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
    @Column({nullable: true})
    profile_image : string

    @Column()
    nickname: string;

    @Column({ default: 0 })
    mileage: number;

    @Column()
    gender: string;

    @Column()
    phone: string;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    authority: Role;

    @Column({ default: false })
    limit: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @OneToMany(() => Product, (product) => product.user_id)
    products: Product[];

    @OneToMany(() => Inquiry, (inquiry) => inquiry.user_id)
    inquiries: Inquiry[];

    @OneToMany(() => InquiryReply, (inquiryReply) => inquiryReply.user_id)
    inquiryReplies: InquiryReply[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comment: Relation<Comment>[];

    @OneToOne(() => HostInfo)
    hostInfo?: HostInfo;

    @OneToOne(() => UserInfo)
    userInfo?: UserInfo;

    @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[];
}
