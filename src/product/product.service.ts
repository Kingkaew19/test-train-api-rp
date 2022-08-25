import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { ICRUDService } from 'artifacts/rds/core/common/interfaces/interface.crud.service';
import { ProductDTO } from './dto/procuct.dto';
import { Op } from 'sequelize';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { ProductSearchDTO } from './dto/product-search.dto';
import {
  CategoryRepository,
  modelName as categoryModelName,
} from 'src/category/repositories/category.repository';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';


@Injectable()
export class ProductService implements ICRUDService<ProductDTO, void> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,) 
    {}

  async create(productDTO: ProductDTO): Promise<ProductDTO> {
    const product = await this.productRepository.insert(productDTO);
    return new ProductDTO(product);
  }

  async read(id: string): Promise<ProductDTO> {
    const product = await this.productRepository.where({ id: id }).findOne({
      attributes: { exclude: ['productname'] },
      include: [
        {
          model: this.categoryRepository.getModel(),
          as: categoryModelName,
          require: false,
        },
      ],
    });
    return new ProductDTO(product);
  }

  async search(
    productSearchDTO: ProductSearchDTO,
  ): Promise<ResponseDTO<ProductDTO[]>> {
    // this.productRepository.page(productSearchDTO.page, productSearchDTO.limit);

    if (productSearchDTO.categoryId) {
      this.productRepository.where({
        categoryId: productSearchDTO.categoryId,
      });
    }

    if (productSearchDTO.status && productSearchDTO.status !== 'all') {
      this.productRepository.where({
        status: productSearchDTO.getStatusArray(),
      });
    }

    if (productSearchDTO.orderBy) {
      if (productSearchDTO.orderType === 'asc') {
        this.productRepository.order(productSearchDTO.orderBy, 'ASC');
      } else {
        this.productRepository.order(productSearchDTO.orderBy, 'DESC');
      }
    }
    const include = [
      {
        model: this.categoryRepository.getModel(),
        as: categoryModelName,
        require: false,
      },
    ];
    const productDTOs: ProductDTO[] = [];
    const responseDTO = new ResponseDTO<ProductDTO[]>();

    if (productSearchDTO.count) {
      const { count, rows } = await this.productRepository.findAndCountAll({
        attributes: { exclude: [''] },
        distinct: true,
        include: include,
      });
      responseDTO.totalItems = count;
      responseDTO.data = Object.assign(productDTOs, rows);
    } else {
      responseDTO.data = Object.assign(
        productDTOs,
        await this.productRepository.findAll({
          include: include,
          attributes: { exclude: ['productname'] },
          subQuery: false,
        }),
      );
    }
    return responseDTO;
  }

  async update(updateDTO: ProductDTO): Promise<ProductDTO> {
    updateDTO.updatedAt = new Date();
    const productyUpdated = await this.productRepository.update(updateDTO, {
      where: { id: updateDTO.id },
      returning: true,
    });

    return new ProductDTO(productyUpdated[1][0]);
  }

  async delete(id: string): Promise<any> {
    return {
      deleteCount: await this.productRepository.where({ id: id }).delete(),
    };
  }


async uploadFile(file: Express.Multer.File, id: string): Promise<any> {
  const productData = await this.read(id);
    const productDTO = new ProductDTO();
    productDTO.id = productData.id;
    productDTO.imagePath = file.filename;
    return await this.update(productDTO);
  
}
}
