import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<< HEAD
import { User } from '../entities/user.entity';
=======
import { User } from 'src/entities/user.entity';
>>>>>>> 587f707a3d925ea1d01569344979c5d879f01a64
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
        

        return user;
    }
}
