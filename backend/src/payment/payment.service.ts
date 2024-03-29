import {
  BadRequestException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create.payment.dto';
import { Payment } from '../entities/payment.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { Livecast } from './../entities/livecast.entity';
import { SearchService } from 'src/search/search.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Livecast)
    private readonly livecastRepository: Repository<Livecast>,
    private readonly elasticsearchService: SearchService,
    private readonly messageService: MessageService
  ) {}

  // 구매하기
  async create(userId: number, createPaymentDto: CreatePaymentDto) {
    const queryRunner =
      this.paymentRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await this.productRepository.findOne({
        where: { id: createPaymentDto.product_id },
      });

      if (!product) {
        throw new NotFoundException('강의 회차 정보가 없습니다.');
      }
      const existPayment = await this.paymentRepository.findOne({
        where: { user_id: userId, product_id: createPaymentDto.product_id },
      });
      if (existPayment) throw new ConflictException('이미 구매한 강의입니다.');
      const user = await this.userRepository.findOne({ where: { id: userId } });

      const afterPaidPoints = user.mileage - createPaymentDto.mileage;

      if (afterPaidPoints < 0) {
        throw new BadRequestException('포인트가 부족합니다.');
      }

      user.mileage = afterPaidPoints;
      await this.userRepository.save(user);

      const payment = this.paymentRepository.create({
        user_id: userId,
        product_id: createPaymentDto.product_id,
        spending: product.sale_price - createPaymentDto.mileage,
        method: createPaymentDto.method,
        mileage: createPaymentDto.mileage,
      });
      await this.paymentRepository.save(payment);
      console.log(product.user_id, userId);
      await this.messageService.createMessage(product.user_id, userId);
      await queryRunner.commitTransaction();

      const savedPayment = await this.paymentRepository.findOne({
        where: { id: payment.id },
        relations: ['product'],
      });

      return {
        payment_id: savedPayment.id,
        product: {
          product_id: savedPayment.product.id,
          product_name: savedPayment.product.name,
          // Add other product properties as needed
        },
        createdAt: savedPayment.createdAt,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error(err);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // 내 구매 목록
  async findAll(userId: number, page: number, pageSize: number) {
    return await this.paymentRepository.findAndCount({
      where: { user_id: userId },
      relations: ['product'],
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { id: 'DESC' },
    });
  }

  // 구매자+강의 조합 찾기
  async findOneWithUserAndProduct(user_id: number, product_id: number) {
    return await this.paymentRepository.findOne({
      where: { user_id, product_id },
    });
  }

  // 상품별 매출액
  async getRevenue(product_id: number) {
    return await this.paymentRepository
      .createQueryBuilder()
      .select('SUM(spending)', 'sum')
      .addSelect('SUM(mileage)', 'sum2')
      .where(`product_id=${product_id}`)
      .getRawOne();
  }

  // 상품별 구매 목록
  async getByProduct(product_id: number, page: number, pageSize: number) {
    return await this.paymentRepository.findAndCount({
      where: { product_id },
      take: pageSize,
      skip: (page - 1) * pageSize,
      relations: ['user'],
    });
  }

  // 구매자+id 조합 찾기
  async findOne(id: number, userId: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id, user_id: userId },
      relations: ['product'],
    });

    if (!payment) {
      throw new NotFoundException('강의 구매 정보를 찾을 수 없습니다.');
    }

    return {
      payment_id: payment.id,
      product: {
        product_id: payment.product.id,
        product_name: payment.product.name,
        // Add other product properties as needed
      },
      createdAt: payment.createdAt,
    };
  }

  // 인기 강의 찾기
  async getTopProducts() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.product', 'product')
      .select('COUNT(*)', 'count')
      .addSelect('product')
      .where('payment.createdAt >= :oneWeekAgo', { oneWeekAgo })
      .groupBy('payment.product_id')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();
  }

  // 주어진 product_id 배열 안에서 인기 강의 찾기
  async getPersonalTopProducts(key: string) {
    const products = (
      await this.elasticsearchService.searchDocuments('products', { name: key })
    ).map((product) => {
      const source = product._source;
      return {
        product_id: source.id,
        product_name: source.productname,
        product_intro: source.intro,
        product_thumbnail: source.thumbnail,
        product_sale_price: source.sale_price,
      };
    });
    /* const products = await this.productRepository.createQueryBuilder('product')
			.select()
			.where(`match(name,body) against ('${key}' in boolean mode)`)
			.andWhere('accepted=1')
			.orderBy('id','DESC')
			.limit(30)
			.getRawMany() */
    if (!products.length) return [];
    const topProducts = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('payment.product_id', 'product_id')
      .addSelect('COUNT(*)', 'count')
      .where('payment.product_id IN (:...product_ids)', {
        product_ids: products.map((product) => product.product_id),
      })
      .groupBy('payment.product_id')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();
    const res = products.filter(
      (product) =>
        topProducts
          .map((product) => product.product_id)
          .indexOf(product.product_id) !== -1
    );
    for (
      let i = 0;
      i < products.length && res.length < Math.min(5, products.length);
      ++i
    )
      if (
        !res.filter((product) => product.product_id === products[i].product_id)
          .length
      )
        res.push(products[i]);
    console.log(topProducts, res);
    return res;
  }

  // 카테고리별 강의 찾기
  async getCategoryTopProducts(
    category,
    page: number = 1,
    pageSize: number = 5
  ) {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .select()
      .where(`category='${category}'`)
      .andWhere('accepted=1')
      .orderBy('id', 'DESC')
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .getManyAndCount();
    if (!products.length) return [];
    return products;
  }

  // 구매자+상품 조합 찾기
  async getMyAndProduct(user_id: number, product_id: number) {
    return await this.paymentRepository.findOne({
      where: { user_id, product_id },
    });
  }
}
