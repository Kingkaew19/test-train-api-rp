import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsString } from 'class-validator';
import { CategoryDTO } from 'src/category/dto/category.dto';
import { BaseDTO } from 'src/common/dto/base.dto';

export class ProductDTO extends BaseDTO {
  @IsNumber()
  @ApiProperty({
    description: 'id of product',
    type: Number,
    example: 1,
  })
  id: number;

  @IsDate()
  @ApiProperty({
    description: 'Created date of product',
    type: Date,
    example: '',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'Updated date of product',
    type: Date,
    example: '',
  })
  updatedAt: Date;

  @IsString()
  @ApiProperty({
    description: 'Name of product',
    type: String,
    example: '',
  })
  name: string

  @IsString()
  @ApiProperty({
    description: 'SKU of product',
    type: String,
    example: '',
  })
  sku: string

  @IsString()
  @ApiProperty({
    description: 'Price of product',
    type: String,
    example: '',
  })
  price: string

  @IsString()
  @ApiProperty({
    description: 'stock of product',
    type: String,
    example: '',
  })
  stock: string

  @IsString()
  @ApiProperty({
    description: 'description of product',
    type: String,
    example: '',
  })
  description: string

  @IsNumber()
  @ApiProperty({
    description: 'category ID of product',
    type: Number,
    example: 1,
  })
  categoryId?: number;
  category?: CategoryDTO;

  @IsString()
  @ApiProperty({
    description: 'pathImage of product',
    type: String,
    example: '',
  })
  imagePath: string
}
