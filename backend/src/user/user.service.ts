import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateuserDto } from './dto/update-user.dto';
import { Product } from 'src/entities/product.entity';
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import { ConfigService } from '@nestjs/config';
import { basename, extname } from 'path';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enum/Role';

@Injectable()
export class UserService {


    constructor(
        @InjectRepository(User)private readonly userRepository: Repository<User>,
        @InjectRepository(Product) private readonly productRepositoy: Repository<Product>,
        private readonly configService : ConfigService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}
    private readonly s3Client = new S3Client({region : this.configService.getOrThrow("S3_REGION"), credentials: {
        accessKeyId: process.env.AWS_S3_accessKeyId,
        secretAccessKey: process.env.AWS_S3_secretAccessKey
    }})    

    async getUserInfo(id: number) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }
        

        return user;
    }
    async updateUserinfo(id: number ,updateUser:  UpdateuserDto){
        const hashedPassword = await bcrypt.hashSync(updateUser.Password, 12);
        return await this.userRepository.update(id , {email : updateUser.Email , password : hashedPassword })
    
      
    }

    async upload(filename: string, file: Buffer, id : number) {
            const ext = extname(filename); // 확장자
            const baseName = basename(filename, ext); // 확장자 제외
            const fileName = `images/${baseName}-${Date.now()}${ext}`
        
        try {
            await this.s3Client.send(new PutObjectCommand({ Bucket: "chatpt-githubaction-s3-bucket", Key: fileName, Body: file }));
            await this.userRepository.update(id , {profile_image : "https://chatpt-githubaction-s3-bucket.s3.ap-northeast-2.amazonaws.com/" + fileName 
        })
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

    async Hostupdate(id : number){
        return await this.userRepository.update(id , {authority : Role.Host})
    
    }

}
