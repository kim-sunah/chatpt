import {IsEmail,IsNotEmpty,IsOptional,IsString,IsStrongPassword} from 'class-validator';
import {Column,CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity,PrimaryGeneratedColumn} from 'typeorm';

import { Role } from '../../enum/Role';
enum  Gender {
    Male,
    Female
}

@Entity('users')


export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column()
    Email : string
 
    @Column()
    Password: string;

    @Column()
    Nickname: string;

    @Column({ default : 0})
    Mileage : number

    @Column()
    Gender : Gender

    @Column()
    phone: string;

    @Column({type : "enum", enum : Role , default : Role.User})
    Authority : Role

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}
