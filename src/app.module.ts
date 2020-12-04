import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orm_config } from './orm.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, TypeOrmModule.forRoot(orm_config)],
  controllers: [],
  providers: [],
})
export class AppModule { }
