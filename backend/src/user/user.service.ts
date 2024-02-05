import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateuserDto } from './dto/update-user.dto';
import { Product } from 'src/entities/product.entity';
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {

    private readonly s3Client = new S3Client({region : this.configService.getOrThrow("S3_REGION")})    
    constructor(
        @InjectRepository(User)private readonly userRepository: Repository<User>,
        @InjectRepository(Product) private readonly productRepositoy: Repository<Product>,
        private readonly configService : ConfigService
    ) {}

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
        if(user.phone !== updateUser.phone){
            const existphone = await this.userRepository.findOne({where : {phone : updateUser.phone}})
            if(existphone){
                throw new BadRequestException("이미 사용중인 번호입니다.")
            }
        }
        if(user){
            await this.userRepository.update(id, {email : updateUser.Email , phone : updateUser.phone});
        }
        else {
            throw new NotFoundException(`User with id ${id} not found`);
        }
    }

    async upload(filename: string, file: Buffer) {
        try {
            await this.s3Client.send(new PutObjectCommand({ Bucket: "chatpt-githubaction-s3-bucket", Key: filename, Body: file }));
            console.log('Upload successful');
        } catch (error) {
            console.error('Error uploading to S3:', error);
        }
    }
    

    async Allproduct(id : number){
        const productlist = await this.productRepositoy.find({where : {user_id : id}})
        return productlist
        


    }

    async limituser(id: number ){
        const user = await this.userRepository.findOne({where : {id : id}})
        if(!user){
            throw new NotFoundException("존재하지 않는 유저입니다")
        }
        if(user.limit === false){
            user.limit = true;
        }
        else if(user.limit === true){
            user.limit = false;
        }
        return await this.userRepository.update(id , user);
    }

}
