import {IsEmail,IsNotEmpty,IsOptional,IsString,IsStrongPassword} from 'class-validator';
import {Column,CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity,PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Gender } from '../enum/Gender';
import { Role } from '../enum/Role';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column()
    email : string
 
    @Column()
    password: string;

    @Column()
    nickname: string;

    @Column({default : 0})
    mileage : number

    @Column()
    gender : Gender

    @Column()
    phone: string;

    @Column({type : "enum", enum : Role , default : Role.User})
    authority : Role

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}
