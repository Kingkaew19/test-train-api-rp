import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'artifacts/rds/core/base.repository';
import { RDSService } from 'artifacts/rds/rds.service';
import { DataTypes, Model, ModelCtor } from 'sequelize';

export const modelName = 'category';
export const tableName = 'categorys';

@Injectable()
export class CategoryRepository extends BaseRepository {
  private categoryModel: ModelCtor<Model>;

  constructor(private readonly rdsService: RDSService) {
    super();
  }

  protected init() {
    this.categoryModel = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        modelName,
        {
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          ...this.getCommonDefinedFields(),
        },
        tableName,
        true,
      );

    return this.categoryModel;
  }
}
