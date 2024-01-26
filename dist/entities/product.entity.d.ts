import { Relation } from 'typeorm';
import { Category } from '../enum/Category';
import { ProductStatus } from '../enum/ProductStatus';
import { User } from './user.entity';
import { ProductImage } from './product-image.entity';
import { Inquiry } from './inquiry.entity';
import { Comment } from './comment.entity';
export declare class Product {
    id: number;
    user_id: number;
    name: string;
    thumbnail: string;
    category: Category;
    status: ProductStatus;
    body: string;
    price: number;
    sale_price: number;
    rating_count: number;
    rating_total: number;
    sales_volume: number;
    revenue: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    user: User;
    images: ProductImage[];
    inquiries: Inquiry[];
    comment: Relation<Comment>[];
}
