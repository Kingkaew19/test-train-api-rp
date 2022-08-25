import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class CategoryDTO extends BaseDTO {
  @IsNumber()
  @ApiProperty({
    description: 'id of Category',
    type: Number,
    example: 1,
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: 'name of Category',
    type: String,
    example: '',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'description of Category',
    type: String,
    example: '',
  })
  description: string;
}
