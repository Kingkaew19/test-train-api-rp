import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { CategoryRepository } from 'src/category/repositories/category.repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [RDSModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, CategoryRepository],
})
export class ProductModule {}
