import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductCreateDto } from 'src/dto/product-create.dto';
import { productdata, product_log } from 'src/entity/product.entity';
import { getConnection } from 'typeorm';
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
    async getLog(id: number) {
        try {

            const find = await this.productlog.find({ where: { productid: id } })
            if (!find.length) throw new Error('no log data ');

            return {
                success: true,
                data: find
            }

        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message,
            });
        }
    }

    async getbyId(id: number) {
        try {
            const find = await this.product.findOne({ where: { id: id } })
            // console.log(find)
            if (!find) throw new Error('no product data ');

            return {
                success: true,
                data: find
            }
        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message,
            });
        }
    }


    async addProduct(body: ProductCreateDto[]) {
        try {

            for (let i in body) {
                const product = new productdata()
                const productlog = new product_log()
                const { sku, price, note, quantity } = body[i];
                // console.log(body[i])
                const findproduct = await this.product.findOne({ where: { sku: sku } })
                if (findproduct) throw new Error('มีชื่อซ้ำ');
                product.sku = sku
                product.price = price
                product.quantity = quantity
                product.note = note
                await product.save();
                // console.log('product :', product)
                productlog.productid = product
                productlog.sku_updated = sku
                productlog.price_updated = price
                productlog.quantity_updated = quantity
                productlog.note_updated = note
                await productlog.save();

            }


            return {
                success: true,
                message: 'add success.',

            };

        } catch (error) {

            throw new BadRequestException({
                success: false,
                message: error.message,
            });

        }
    }

    async updateProduct(id: number, body: ProductCreateDto) {
        try {
            const productlog = new product_log()
            const { sku, price, note, quantity } = body;
            const find = await this.product.findOne({ where: { id: id } })
            if (!find) throw new Error('not found.');
            if (find.quantity + quantity < 0) throw new Error('สินค้าไม่พอ');
            find.sku = sku
            find.price = price
            find.quantity = find.quantity + quantity
            find.note = note
            await find.save()
            productlog.productid = find;
            productlog.sku_updated = sku
            productlog.price_updated = price
            productlog.quantity_updated = quantity
            productlog.note_updated = note
            await productlog.save()
            return {
                success: true,
                message: 'updated success.',
                data: productdata
            };

        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: error.message,
            })
        }


    }


    async deleteProduct(id: number) {
        try {
            const find = await this.product.findOne({ where: { id: id } })
            if (!find) throw new Error('id not found.');
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(productdata)
                .where("id = :id", { id: id })
                .execute();

            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(product_log)
                .where("productid = :productid", { productid: id })
                .execute();

            return {
                success: true,
                message: 'delete success.'
            };


        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: error.message,
            });
        }
    }

}