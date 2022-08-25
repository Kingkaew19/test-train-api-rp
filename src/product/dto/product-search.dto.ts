import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SearchDTO } from 'src/common/dto/search.dto';
import { NUMBER } from 'sequelize/types';

export class ProductSearchDTO extends SearchDTO {
  @IsString()
  @Type(() => String)
  status = '';

  @IsString()
  @Type(() => String)
  orderBy = '';

  @IsString()
  @Type(() => String)
  orderType = '';

  @IsString()
  @Type(() => String)
  between = '';

  @IsString()
  @Type(() => String)
  betweenDate = '';

  @IsNumber()
  @Type(() => Number)
  categoryId? = 1;

  @IsString()
  @Type(() => String)
  category? = '';

  getStartDate() {
    return this.betweenDate.split(',')[0];
  }

  getEndDate() {
    return this.betweenDate.split(',')[1];
  }

  getStatusArray() {
    return this.status.split(',');
  }
}
