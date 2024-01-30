import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { SearchProductDto } from './dtos/search-product.dto';
import { PageDto } from './dtos/page.dto';
import { Id } from 'src/util/id';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProducts(query: PageDto): Promise<import("../entities/product.entity").Product[]>;
    searchProducts(query: SearchProductDto): Promise<[import("../entities/product.entity").Product[], number]>;
    getMyProducts(query: PageDto): Promise<[import("../entities/product.entity").Product[], number]>;
    getProductById(query: Id): Promise<import("../entities/product.entity").Product>;
    createProduct(body: CreateProductDto): Promise<any>;
    softDeleteProduct(param: Id): Promise<void>;
    updateProduct(param: Id, body: UpdateProductDto): Promise<any>;
    uploadThumbnail(image: any, param: Id): Promise<{
        id: number;
        thumbnail: string;
    } & import("../entities/product.entity").Product>;
    uploadImage(image: any, param: Id): Promise<{
        product_id: number;
        original_url: string;
    } & import("../entities/product-image.entity").ProductImage>;
    getImages(param: Id): Promise<import("../entities/product-image.entity").ProductImage[]>;
    softDeleteImage(param: Id): Promise<import("typeorm").UpdateResult>;
}
