import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateuserDto } from './dto/update-user.dto';
import { use } from 'passport';

@Injectable()
export class UserService {
    [x: string]: any;
    constructor(@InjectRepository(User)private readonly userRepository: Repository<User>,) {}

    async getUserInfo(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }
        return user;
    }

    async updateUserinfo(id: number ,updateUser:  UpdateuserDto){
        
        const user = await this.userRepository.findOne({where : {id : id}});
        if(user.email !== updateUser.Email){
            const existemail = await this.userRepository.findOne({where : {email : updateUser.Email}})
            if(existemail){
                throw new BadRequestException("이미 사용중인 이메일입니다.")
            }
        }
        if(user.nickname !== updateUser.Nickname){
            const existname = await this.userRepository.findOne({where : {nickname : updateUser.Nickname}})
            if(existname){
                throw new BadRequestException("이미 사용중인 이름입니다")
            }
        }
        if(user.phone !== updateUser.phone){
            const existphone = await this.userRepository.findOne({where : {phone : updateUser.phone}})
            if(existphone){
                throw new BadRequestException("이미 사용중인 번호입니다.")
            }

        }
        if(user){
            await this.userRepository.update(id, {email : updateUser.Email, nickname : updateUser.Nickname , phone : updateUser.phone});
        }
        else {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        

        
    }
}
