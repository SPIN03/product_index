import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository, ProductlogRepository } from './products.repository';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([ProductRepository]), TypeOrmModule.forFeature([ProductlogRepository])]
})
export class ProductsModule { }
