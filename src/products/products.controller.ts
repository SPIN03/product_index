import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productservice: ProductsService) { }

    @Get('getproduct')
    async getproduct() {
        return this.productservice.getProduct();
    }
}
