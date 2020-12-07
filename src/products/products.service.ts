import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductCreateDto } from 'src/dto/product-create.dto';
import { productdata, product_log } from 'src/entity/product.entity';
import { getConnection } from 'typeorm';
import { ProductlogRepository, ProductRepository } from './products.repository';
import * as request from 'request';
import { promisify } from 'util';


const fetch = promisify(request);
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

    // async getrequest() {
    //    const option = {
    //   method: 'GET',
    //   url: 'http://192.168.1.136:3000/products/getproduct',
    // };

    // const data = await Fetch(option);
    // const body = JSON.parse(data.body);
    // console.log(body)
    // return body
    // }

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

    async getbyskucode(body: ProductCreateDto) {
        try {
            const find = await this.product.find({ where: { sku_code: body.sku_code } })
            // console.log(find)
            if (!find.length) throw new Error('no product data ');

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
            if (!body.length) throw new Error('No data');
            for (let i in body) {
                const product = new productdata()
                const productlog = new product_log()
                const { sku_code, sku_name, price, note, quantity } = body[i];
                console.log(body[i])
                const findproduct = await this.product.findOne({ where: { sku_code: sku_code } })
                if (findproduct) throw new Error('มีชื่อซ้ำ');
                product.sku_code = sku_code
                product.sku_name = sku_name
                product.price = price
                product.quantity = quantity
                product.note = note
                await product.save();
                // console.log('product :', product)
                productlog.productid = product
                productlog.sku_code_updated = sku_code
                productlog.sku_name_updated = sku_name
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
            const { sku_code, sku_name, price, note, quantity } = body;
            const find = await this.product.findOne({ where: { id: id } })
            if (!find) throw new Error('not found.');
            if (find.quantity + quantity < 0) throw new Error('สินค้าไม่พอ');
            find.sku_code = sku_code
            find.sku_name = sku_name
            find.price = price
            find.quantity = find.quantity + quantity
            find.note = note
            await find.save()
            productlog.productid = find;
            productlog.sku_code_updated = sku_code
            productlog.sku_name_updated = sku_name
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

    // async deleteproductmore(id: number[]) {
    //     try {
    //         console.log('id :', id)
    //         for (let i in id) {
    //             console.log('i :', i)
    //             const numberid = id[i]
    //             const find = await this.product.findOne({ where: { id: numberid } })
    //             if (!find) throw new Error('id not found.');
    //             await getConnection()
    //                 .createQueryBuilder()
    //                 .delete()
    //                 .from(productdata)
    //                 .where("id = :id", { id: id })
    //                 .execute();

    //             await getConnection()
    //                 .createQueryBuilder()
    //                 .delete()
    //                 .from(product_log)
    //                 .where("productid = :productid", { productid: id })
    //                 .execute();
    //         }
    //         return {
    //             success: true,
    //             message: 'delete success.'
    //         };


    //     } catch (error) {
    //         throw new BadRequestException({
    //             success: false,
    //             message: error.message,
    //         });
    //     }



    // }

}