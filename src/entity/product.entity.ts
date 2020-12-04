import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    BaseEntity,
} from 'typeorm';

@Entity()
export class productdata extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sku: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column({ nullable: true })
    note: string;


}

@Entity()
export class product_log extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity_updated: number;

    @Column()
    sku_updated: string;

    @Column()
    price_updated: number;

    @Column({ nullable: true })
    note_updated: string;

    @CreateDateColumn()
    date_created: Date;

    @ManyToOne((type) => productdata, (productdata) => productdata.id)
    productid: productdata;


}