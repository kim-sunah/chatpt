import { Category } from 'src/enum/Category';
import { ProductStatus } from 'src/enum/ProductStatus';
export declare class CreateProductDto {
    name: string;
    category: Category;
    status: ProductStatus;
    body: string;
    price: number;
    sale_price: number;
}
