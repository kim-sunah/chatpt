import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from 'src/entities/delivery.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class DeliveryService {
  constructor(@InjectRepository(Delivery) private readonly userRepository: Repository<Delivery>,) {}
  async createdelivery(user :User) {
    try {
      const A = this.userRepository.create()
    
      const foundUser = await this.userRepository.findOne({where: { user: user },relations: ['delivery'],});
      
      if (foundUser) {
        // Process the found user with its related delivery information
        console.log(foundUser);
      } else {
        console.log('User with user_id 1 not found.');
      }
    } catch (error) {
      console.error('Error while finding user:', error.message);
      // Handle the error appropriately
    }
  }

  findAll() {
    return `This action returns all delivery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} delivery`;
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return `This action updates a #${id} delivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} delivery`;
  }
}
