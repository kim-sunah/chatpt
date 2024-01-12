import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
} from 'class-validator';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    /**
     * 이메일
     * @example "test@naver.com"
     */
    @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
    @IsEmail({}, { message: '이메일 형식에 맞지 않습니다.' })
    @Column({ unique: true })
    email: string;

    /**
     * 비밀번호
     * @example "tes1234!@"
     */
    @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
    @IsStrongPassword(
        {},
        {
            message:
                '비밀번호는 영문 알파벳 대/소문자, 숫자, 특수문자를 포함해야합니다.',
        },
    )
    @Column()
    password: string;

    /**
     * 이름
     * @example "테스트"
     */
    @IsNotEmpty({ message: '이름을 입력해 주세요.' })
    @IsString({ message: '이름 형식에 맞지 않습니다.' })
    @Column()
    name: string;

    /**
     * 전화번호
     * @example "01012345678"
     */
    @IsString()
    @Column()
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}
