import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'backend/src/entities/user.entity';
import { Repository } from 'typeorm';
import { Product } from 'backend/src/entities/product.entity';


@Injectable()
export class AdminService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, @InjectRepository(Product) private readonly productRepositoy: Repository<Product>) {}

  async Allusercount(page : number){
    const product = await this.productRepositoy.find()
    const productCount = product.length;
    const user = await this.userRepository.find();
    const userCount = user.length;
    const products = await this.productRepositoy.find({skip : (page - 1) * 6, take: 6})
    const users = await this.userRepository.find({skip : (page - 1) * 6,take: 6 });

    return { users ,  products, productCount, userCount}
  }
  // async Allproduct(page : number){
  //   const products = await this.productRepositoy.find()
  //   const productCount = products.length;
  //   const product = await this.productRepositoy.find({
  //     skip : (page - 1) * 8,
  //     take: 8,  // 최대 5개의 레코드만 가져오기
  // })
  // return {product}

  // }
  async count(page : number){
    const users = await this.userRepository.find();
    const products = await this.productRepositoy.find()
    const userCount = users.length;
    const productCount = products.length;


    return {userCount,productCount}
  }

  async RecentlyAlluser(){
    const users = await this.userRepository.find({order: {createdAt: 'DESC',}, take: 8});
    return {users}
  }

  async productlist(page : number){
    const product = await this.productRepositoy.find()
    const productCount = product.length;
    const products = await this.productRepositoy.find({skip : (page - 1) * 5, take: 5})
    return { products, productCount,}
  }


  async userList(page : number){
    const user = await this.userRepository.find()
    const userCount = user.length;
    const users = await this.userRepository.find({skip : (page - 1) * 11, take: 11})
    return {users, userCount}
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
