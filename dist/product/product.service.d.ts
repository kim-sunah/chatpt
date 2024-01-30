import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductImage } from '../entities/product-image.entity';
import { Request } from 'express';
export declare class ProductService {
    private readonly productRepository;
    private readonly productImageRepository;
    private readonly req;
    constructor(productRepository: Repository<Product>, productImageRepository: Repository<ProductImage>, req: Request);
    getProducts(page: number, pageSize: number): Promise<Product[]>;
    query(key: any, antiKey: any): string;
    categoryArray(categories: any): any[];
    searchProducts(query: any): Promise<[Product[], number]>;
    getProductById(id: number): Promise<Product>;
    checkUploader(id: number): Promise<Product>;
    createProduct(body: any): Promise<any>;
    softDeleteProduct(id: number): Promise<void>;
    updateProduct(id: number, body: any): Promise<any>;
    getMyProducts(query: any): Promise<[Product[], number]>;
    uploadThumbnail(id: number, thumbnail: string): Promise<{
        id: number;
        thumbnail: string;
    } & Product>;
    uploadImage(product_id: number, original_url: string): Promise<{
        product_id: number;
        original_url: string;
    } & ProductImage>;
    getImages(product_id: number): Promise<ProductImage[]>;
    softDeleteImage(id: number): Promise<import("typeorm").UpdateResult>;
}
