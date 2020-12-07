import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class ProductCreateDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sku: string;

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