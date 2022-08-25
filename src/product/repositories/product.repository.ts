import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelCtor } from 'sequelize';
import { RDSService } from 'artifacts/rds/rds.service';
import { BaseRepository } from 'artifacts/rds/core/base.repository';
import { AssociateRepository } from 'artifacts/rds/core/associate.repository';

import {
  CategoryRepository,
  modelName as categoryModelName,
} from 'src/category/repositories/category.repository';

const modelName = 'product';
const tableName = 'products';
@Injectable()
export class ProductRepository extends AssociateRepository {
  private productModel: ModelCtor<Model>;

  constructor(private readonly rdsService: RDSService ,
    private readonly categoryRepository: CategoryRepository,) {
    super();
  }

  protected init() {
    this.productModel = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        modelName,
        {
          sku: {
            field: 'sku',
            type: DataTypes.STRING,
            allowNull: false,
          },
          name: {
            field: 'name',
            type: DataTypes.STRING,
            allowNull: true,
          },
          price: {
            field: 'price',
            type: DataTypes.STRING,
            allowNull: true,
          },
          stock: {
            field: 'stock',
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: {
            field: 'description',
            type: DataTypes.STRING,
            allowNull: false,
          },
          categoryId: {
            field: 'categoryId',
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          imagePath: {
            field: 'imagePath',
            type: DataTypes.STRING,
            allowNull: true,
          },
          ...this.getCommonDefinedFields(),
        },
        tableName,
        true,
      );
    return this.productModel;
  }

  protected setupAssociation(associateFetch: Map<string, any>) {
    console.log('associateFetchuser', associateFetch);

    this.productModel.belongsTo(this.categoryRepository.getModel(), {
      foreignKey: 'categoryId',
    });
    associateFetch.set(categoryModelName, [
      { model: this.categoryRepository.getModel() },
    ]);
  }
}
