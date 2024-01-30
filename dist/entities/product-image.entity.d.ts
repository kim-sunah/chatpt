import { Product } from './product.entity';
export declare class ProductImage {
    id: number;
    product_id: number;
    original_url: string;
    server_url: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    product: Product;
}
