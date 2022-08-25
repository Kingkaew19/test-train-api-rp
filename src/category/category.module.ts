import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RDSModule } from 'artifacts/rds/rds.module';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [RDSModule, ConfigModule],
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
  exports: [],
})
export class CategoryModule {}
