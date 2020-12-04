import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductlogRepository, ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly product: ProductRepository, private readonly productlog: ProductlogRepository) { }
    async getProduct() {
        try {
            const datafind = await this.product.find()

            if (!datafind.length) throw new Error('no data');
            return {
                success: true,
                data: datafind
            }

        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message,
            });
        }
    }

}
