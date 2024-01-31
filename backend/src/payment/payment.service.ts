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
        // 트랜잭션 시작 및 쿼리 러너 생성
        const queryRunner = this.paymentRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 강의 조회
            const product = await this.productRepository.findOne({
                where: { id: createPaymentDto.product_id },
            });

            if (!product) {
                throw new NotFoundException('강의 회차 정보가 없습니다.');
            }

            // 결제 금액
            const paymentAmount = product.price;

            // 유저 조회
            const user = await this.userRepository.findOne({ where: { id: userId } });

            // 결제 후 남은 포인트 계산
            const afterPaidPoints = user.mileage - paymentAmount;

            if (afterPaidPoints < 0) {
                throw new BadRequestException('포인트가 부족합니다.');
            }

            // 유저 포인트 업데이트
            user.mileage = afterPaidPoints;
            await this.userRepository.save(user);

            // 결제 엔터티 생성 및 저장
            const payment = this.paymentRepository.create({
                user_id: userId,
                product_id: createPaymentDto.product_id,
                pay_method_id: createPaymentDto.pay_method_id,
                spending: paymentAmount,
                mileage: createPaymentDto.mileage,
            });
            await this.paymentRepository.save(payment);

            // 강의 회차의 잔여석 감소
            product.vacancy -= createPaymentDto.count;
            await this.productRepository.save(product);

            // 트랜잭션 커밋 및 결과 반환
            await queryRunner.commitTransaction();

            // 트랜잭션 이후, 추가 정보를 가져와서 원하는 응답을 반환
            const savedPayment = await this.paymentRepository.findOne({
                where: { id: payment.id },
                relations: ['product', 'product.livecast'],
            });

            return {
                payment_id: savedPayment.id,
                product: {
                    product_id: savedPayment.product.id,
                    host_name: savedPayment.product.host_name,
                    product_name: savedPayment.product.name,
                    product_text: savedPayment.product.body,
                    category_id: savedPayment.product.category,
                    start_date: savedPayment.product.start_on,
                    end_date: savedPayment.product.end_on,
                    start_time: savedPayment.livecast.start_time,
                    end_time: savedPayment.livecast.end_time,
                },
                createdAt: savedPayment.createdAt,
            };
        } catch (err) {
            // 에러 발생 시 롤백 및 에러 전파
            await queryRunner.rollbackTransaction();
            console.error(err);
            throw err;
        } finally {
            // 쿼리 러너 해제
            await queryRunner.release();
        }
    }

    async findAll(userId: number) {
        // 유저의 모든 결제 내역 조회
        const payments = await this.paymentRepository.find({
            where: { user_id: userId },
            relations: ['product', 'product.livecast'], // 'product' 및 'livecast' 관계를 로드
        });

        // 결과를 원하는 형식으로 변환
        const formattedPayments = payments.map((payment) => ({
            payment_id: payment.id,
            product: {
                product_id: payment.product.id,
                host_name: payment.product.host_name,
                product_name: payment.product.name,
                product_text: payment.product.body,
                category_id: payment.product.category,
                start_date: payment.product.start_on,
                end_date: payment.product.end_on,
                start_time: payment.livecast.start_time,
                end_time: payment.livecast.end_time,
            },
            createdAt: payment.createdAt,
        }));

        return formattedPayments;
    }

    async findOne(id: number, userId: number) {
        // 특정 결제 내역 조회
        const payment = await this.paymentRepository.findOne({
            where: { id, user_id: userId },
            relations: ['product', 'product.livecast'], // 'product' 및 'livecast' 관계를 로드
        });

        if (!payment) {
            throw new NotFoundException('강의 구매 정보를 찾을 수 없습니다.');
        }

        // 결과를 원하는 형식으로 변환
        return {
            payment_id: payment.id,
            product: {
                product_id: payment.product.id,
                host_name: payment.product.host_name,
                product_name: payment.product.name,
                product_text: payment.product.body,
                category_id: payment.product.category,
                start_date: payment.product.start_on,
                end_date: payment.product.end_on,
                start_time: payment.livecast.start_time,
                end_time: payment.livecast.end_time,
            },
            createdAt: payment.createdAt,
        };
    }
}
