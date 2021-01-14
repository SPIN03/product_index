
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class ProductCreateDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sku_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sku_code: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantity: number;


    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    note: string;


}