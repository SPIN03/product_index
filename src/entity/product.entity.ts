import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    BaseEntity,
    OneToMany,
} from 'typeorm';

@Entity()
export class productdata extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sku_code: string;

    @Column()
    sku_name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column({ nullable: true })
    note: string;

    @OneToMany(type => product_log, productlog => productlog.productid)
    producthis: product_log[];

}

@Entity()
export class product_log extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity_updated: number;

    @Column()
    sku_code_updated: string;

    @Column()
    sku_name_updated: string;

    @Column()
    price_updated: number;

    @Column({ nullable: true })
    note_updated: string;

    @CreateDateColumn()
    date_created: Date;

    @ManyToOne((type) => productdata, (productdata) => productdata.id, { onDelete: 'CASCADE' })
    productid: productdata;


}