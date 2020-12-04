import { EntityRepository, Repository } from "typeorm";
import { productdata, product_log } from "src/entity/product.entity";

@EntityRepository(productdata)
export class ProductRepository extends Repository<productdata> { }

@EntityRepository(product_log)
export class ProductlogRepository extends Repository<product_log> { }
