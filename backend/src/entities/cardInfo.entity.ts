import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';

@Entity('pay_method')
export class PayMethod {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column('int', { unsigned: true })
    user_id: number;

    @Column()
    email: string;

    @Column()
    card_number: string;

    @Column()
    card_company: string;

    @Column()
    cvc: string;

    @Column()
    password: string;

    @Column()
    mileage: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}
