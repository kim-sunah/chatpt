import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateuserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import passport from 'passport';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}
    async signUp({ Email, Password,  Gender, Nickname ,phone,authority}: CreateuserDto) {
        try{
         
            const existedUser = await this.userRepository.findOne({where : {email : Email}});
            if (existedUser) {
                throw new BadRequestException('이미 사용중인 이메일입니다.');
            }
            const exitnickname = await this.userRepository.findOne({where : {nickname : Nickname}})
            if (exitnickname) {
                throw new BadRequestException('이미 사용중인 닉네임입니다.');
            }

            const exitphone = await this.userRepository.findOne({where : {phone : phone}})
            if (exitphone) {
                throw new BadRequestException('이미 사용중인 번호입니다.');
            }
            const hashedPassword = await bcrypt.hashSync(Password, 12);
           const user= this.userRepository.create({ email : Email, password: hashedPassword, nickname : Nickname, phone , gender : Gender, authority})
           return await this.userRepository.save(user)
        }
        catch(error){
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('회원 가입 중 오류가 발생했습니다.')
        }
    }

    async signIn({Email, Password} : SignInDto) {
        const user = await this.userRepository.findOne({where : {email : Email}})
        console.log(user)
        if(!user){
            throw new UnauthorizedException("존재하지 않는 이메일입니다.")
        }
        if(!(await bcrypt.compare(Password, user.password))){
            throw new UnauthorizedException("존재하지 않는 비밀번호입니다.")
        }

        const payload = {Email , id : user.id}
        return {access_token : this.jwtService.sign(payload,{expiresIn : "15m"})}
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOneBy({ email });
      }


}
