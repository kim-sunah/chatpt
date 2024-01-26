import { Relation } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
export declare class Comment {
    id: number;
    product_id: number;
    user_id: number;
    body: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    user: Relation<User>;
    product: Relation<Product>;
}
