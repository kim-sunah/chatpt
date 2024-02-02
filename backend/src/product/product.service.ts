import { Injectable, BadRequestException, NotFoundException, ForbiddenException, Scope, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { SearchProductDto } from './dtos/search-product.dto';
import { ProductImage } from '../entities/product-image.entity';
import { Comment } from '../entities/comment.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from '../entities/user.entity';
import { BadwordService } from '../badword/badword.service';
import { EventsGateway } from 'src/events/events.gateway';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { SearchService } from 'src/search/search.service';

@Injectable({ scope: Scope.REQUEST })
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly badwordService: BadwordService,
        @Inject(REQUEST) private readonly req: Request,
        private readonly event: EventsGateway,
        private readonly elasticsearchService: SearchService
    ) {}

    // 수업 목록
    async getProducts(page: number, pageSize: number) {
        return await this.productRepository.find({ take: pageSize, skip: (page - 1) * pageSize });
    }

    // 쿼리 검색 문자열 만들기
    query(key, antiKey) {
        const keyQuery = key
            .split(' ')
            .map((k) => '+' + k)
            .join(' ');
        const antiKeyQuery = antiKey
            ? antiKey
                  .split(' ')
                  .map((k) => '-' + k)
                  .join(' ')
            : '';
        return keyQuery + (antiKeyQuery ? ' ' + antiKeyQuery : '');
    }

    // 비트 풀기
    bitArray(code: number, enumSize: number) {
        const arr = [];
        for (let i = 0, j = 1; i < enumSize; ++i, j *= 2) if (code & j) arr.push(i);
        return arr;
    }

    // 수업 검색
    async searchProducts(query) {
        const { page, pageSize, key, antiKey, minSalePrice, maxSalePrice, categories, status, orderBy, asc } = query;
        const queryBuilder = this.productRepository.createQueryBuilder().select();
        queryBuilder.where('accepted = true');
        queryBuilder
            .andWhere(`match(name,host_name,body) against ('${this.query(key, antiKey)}' in boolean mode)`)
            .andWhere(`sale_price between ${minSalePrice} and ${maxSalePrice}`);
        if (categories < 1023)
            queryBuilder.andWhere(
                `category in (${this.bitArray(categories, 10)
                    .map((c) => `'${c}'`)
                    .join(',')})`
            );
        if (status < 7)
            queryBuilder.andWhere(
                `category in (${this.bitArray(status, 3)
                    .map((c) => `'${c}'`)
                    .join(',')})`
            );
        if (orderBy === 'sale_price' || orderBy === 'capacity') queryBuilder.addOrderBy(orderBy, asc ? 'ASC' : 'DESC');
        queryBuilder.take(pageSize).skip((page - 1) * pageSize);
        return await queryBuilder.getManyAndCount();
    }

    // 수업 id로 찾기
    async getProductById(id: number) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) throw new NotFoundException('해당 수업을 찾을 수 없습니다.');
        return product;
    }

    // 수업 id로 찾고 등록자 확인
    async checkUploader(id: number) {
        const product = await this.getProductById(id);
        if (product.user_id !== this.req.user['id']) throw new ForbiddenException('권한이 없습니다.');
        return product;
    }

    // 수업 등록
    async createProduct(body) {
        const user_id = this.req.user['id'];
        const user = await this.userRepository.findOne({ where: { id: user_id } });
        if (!user) throw new NotFoundException('해당 유저가 존재하지 않습니다.');
        body.sale_price = body.sale_price || body.price;
        body.vacancy = body.capacity;
        const badwords = await this.badwordService.searchBadword(body.name + ' ' + body.body + ' ' + body.intro);
        if (badwords.length)
            throw new BadRequestException(
                '적절하지 못한 단어가 들어있습니다: ' + badwords.map((badword) => badword[1][0]).join(', ')
            );
        return await this.productRepository.save({ ...body, user_id, host_name: user.nickname });
    }

    // 수업 승인
    async acceptProduct(id: number) {
       
        const product = await this.getProductById(id);
        const Instructor = await this.userRepository.findOne({where : {id : product.user_id}})
        const index = "products"
        await this.elasticsearchService.indexDocument(index, {productname : product.name ,Instructor : Instructor.nickname , category : product.category, price : product.price , sale_price : product.sale_price , start : product.start_on , end : product.end_on, startTime : product.start_at , endTime : product.end_at })
        return await this.productRepository.update(id, { accepted: true });
    }

    // 수업 삭제
    async softDeleteProduct(id: number) {
        this.event.Deleteproduct('rejectproduct');
        await this.productRepository.delete(id);
    }

    // 수업 수정
    async updateProduct(id: number, body) {
        const badwords = await this.badwordService.searchBadword(body.name + ' ' + body.body);
        if (badwords.length)
            throw new BadRequestException(
                '적절하지 못한 단어가 들어있습니다: ' + badwords.map((badword) => badword[1][0]).join(', ')
            );
        return await this.productRepository.save({ id, ...body });
    }

    // 내가 등록한 수업 목록
    async getMyProducts(query) {
        const { page, pageSize } = query;
        return await this.productRepository.findAndCount({
            where: { user_id: this.req.user['id'] },
            take: pageSize,
            skip: (page - 1) * pageSize,
        });
    }

    // 수업 썸네일 넣기/수정
    async uploadThumbnail(id: number, thumbnail: string) {
        return await this.productRepository.save({ id, thumbnail });
    }

    // 수업 쇼츠 넣기/수정
    async uploadShorts(id: number, shorts: string) {
        return await this.productRepository.save({ id, shorts });
    }

    // 수업 이미지 넣기
    async uploadImage(product_id: number, original_url: string) {
        return await this.productImageRepository.save({ product_id, original_url });
    }

    // 수업 이미지 가져오기
    async getImages(product_id: number) {
        return await this.productImageRepository.find({ where: { product_id } });
    }

    // 수업 이미지 지우기
    async softDeleteImage(id: number) {
        return await this.productImageRepository.softDelete(id);
    }
}
//
