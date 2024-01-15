import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getUserInfo(id: number) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }
        delete user.Password;

        return user;
    }
}
