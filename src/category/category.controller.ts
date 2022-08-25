import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'artifacts/auth/metadata/public.metadata';
import { RequestDTO } from 'src/common/dto/request.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { CategorySearchDTO } from './dto/category-search.dto';
import { CategoryDTO } from './dto/category.dto';
import { CategoryService } from './category.service';

@ApiTags('Categorys')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get()
  async search(
    @Query() categorySearchDTO: CategorySearchDTO,
  ): Promise<ResponseDTO<CategoryDTO[]>> {
    return this.categoryService
      .search(categorySearchDTO)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoryService.name);
        throw new BadRequestException(err.message);
      });
  }
  // TODO: comment @Public() when production
  @Public()
  @Post()
  create(@Body() categoryDto: RequestDTO<CategoryDTO>): Promise<ResponseDTO<CategoryDTO>> {
    return this.categoryService
      .create(categoryDto.data)
      .then((result) => {
        const response = new ResponseDTO<CategoryDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoryService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Public()
  @Get('/:id')
  read(@Param('id') id: string): Promise<ResponseDTO<CategoryDTO>> {
    return this.categoryService
      .read(id)
      .then((result) => {
        const response = new ResponseDTO<CategoryDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoryService.name);
        throw new BadRequestException(err.message);
      });
  }

  // TODO: comment @Public() when production

  @Public()
  @Put()
  update(@Body() categoryDto: RequestDTO<CategoryDTO>): Promise<ResponseDTO<CategoryDTO>> {
    return this.categoryService
      .update(categoryDto.data)
      .then((result) => {
        const response = new ResponseDTO<CategoryDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoryService.name);
        throw new BadRequestException(err.message);
      });
  }

  // TODO: comment @Public() when production

  @Public()
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.categoryService
      .delete(id)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;
        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoryService.name);
        throw new BadRequestException(err.message);
      });
  }
}
