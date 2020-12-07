import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductCreateDto } from 'src/dto/product-create.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productservice: ProductsService) { }

    @Get('getproduct')
    async getproduct() {
        return this.productservice.getProduct();
    }
    @Get(':id/getproductid')
    @UsePipes(new ValidationPipe())
    async getproductid(@Param('id', ParseIntPipe) id: number) {
        return this.productservice.getbyId(id);
    }

    @Get(':id/getlog')
    @UsePipes(new ValidationPipe())
    async getLog(@Param('id', ParseIntPipe) id: number) {
        return this.productservice.getLog(id);
    }

    @Post('addproduct')
    @UsePipes(new ValidationPipe())
    async addUser(@Body() body: ProductCreateDto[]) {
        return this.productservice.addProduct(body);
    }

    @Patch(':id/updateproduct')

    async updateproduct(@Body() body: ProductCreateDto, @Param('id', ParseIntPipe) id: number) {
        return this.productservice.updateProduct(id, body)
    }


    @Delete(':id/delete')
    async deleteproduct(@Param('id', ParseIntPipe) id: number) {
        return this.productservice.deleteProduct(id)
    }

    // @Delete(':id/deletemore')
    // async deleteproductmore(@Param('id', ParseIntPipe) id: number[]) {
    //     return this.productservice.deleteproductmore(id)
    // }

}
