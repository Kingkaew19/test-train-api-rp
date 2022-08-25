import { Injectable } from '@nestjs/common';
import { ICRUDService } from 'artifacts/rds/core/common/interfaces/interface.crud.service';
import { Op } from 'sequelize';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { CategorySearchDTO } from './dto/category-search.dto';
import { CategoryDTO } from './dto/category.dto';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()

export class CategoryService implements ICRUDService<CategoryDTO, void> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(categoryDTO: CategoryDTO): Promise<CategoryDTO> {
    const category = await this.categoryRepository.insert(categoryDTO);
    return new CategoryDTO(category);
  }
  async read(id: string): Promise<CategoryDTO> {
    const category = await this.categoryRepository.where({ id: id }).findOne();
    return new CategoryDTO(category);
  }

  async update(updateDTO: CategoryDTO): Promise<CategoryDTO> {
    const categoryUpdated = await this.categoryRepository.update(updateDTO, {
      where: { id: updateDTO.id },
      returning: true,
    });

    return new CategoryDTO(categoryUpdated[1][0]);
  }

  async delete(id: string): Promise<any> {
    return {
      deleteCount: await this.categoryRepository.where({ id: id }).delete(),
    };
  }

  async search(categorySearchDTO: CategorySearchDTO): Promise<ResponseDTO<CategoryDTO[]>> {
    const {
      query = '',
      page = 1,
      limit = 20,
      status = 'all',
      orderBy = '',
      orderType = 'asc',
      between = '',
      betweenDate = '',
      count = false,
    } = categorySearchDTO;

    this.categoryRepository.page(page, limit);

    if (query) {
      this.categoryRepository.where({
        name: { [Op.iLike]: `%${query}%` },
      });
    }
    if (status && status !== 'all') {
      this.categoryRepository.where({ status });
    }
    if (orderBy) {
      if (orderType === 'asc') {
        this.categoryRepository.order(orderBy, 'ASC');
      } else {
        this.categoryRepository.order(orderBy, 'DESC');
      }
    }
    if (between && betweenDate) {
      const betweenCondition = {};
      betweenCondition[between] = {
        [Op.between]: [
          new Date(categorySearchDTO.getStartDate()).toUTCString(),
          new Date(categorySearchDTO.getEndDate()).toUTCString(),
        ],
      };
      this.categoryRepository.where(betweenCondition);
    }

    const categoryDTOs: CategoryDTO[] = [];
    const responseDTO = new ResponseDTO<CategoryDTO[]>();

    if (count) {
      const { count, rows } = await this.categoryRepository.findAndCountAll({
        distinct: true,
      });
      responseDTO.totalItems = count;
      responseDTO.data = Object.assign(categoryDTOs, rows);
    } else {
      responseDTO.data = Object.assign(
        categoryDTOs,
        await this.categoryRepository.findAll(),
      );
    }
    return responseDTO;
  }
}
