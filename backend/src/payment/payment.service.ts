import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create.payment.dto';
import { Payment } from '../entities/payment.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { Livecast } from './../entities/livecast.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Livecast) private readonly livecastRepository: Repository<Livecast>
    ) {}

    async create(userId: number, createPaymentDto: CreatePaymentDto) {
        const queryRunner = this.paymentRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const product = await this.productRepository.findOne({
                where: { id: createPaymentDto.product_id },
            });

            if (!product) {
                throw new NotFoundException('강의 회차 정보가 없습니다.');
            }
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
                pay_method_id: createPaymentDto.pay_method_id,
                spending: product.sale_price-createPaymentDto.mileage,
                mileage: createPaymentDto.mileage,
            });
            await this.paymentRepository.save(payment);

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

    async findAll(userId: number) {
        const payments = await this.paymentRepository.find({
            where: { user_id: userId },
            relations: ['product'],
        });

        const formattedPayments = payments.map((payment) => ({
            payment_id: payment.id,
            product: {
                product_id: payment.product.id,
                product_name: payment.product.name,
                // Add other product properties as needed
            },
            createdAt: payment.createdAt,
        }));

        return formattedPayments;
    }

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
}
