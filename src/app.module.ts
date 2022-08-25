import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from 'artifacts/auth/auth.module';
import configuration from './config/configuration';
import { FooModule } from './foo/foo.module';
import { BarModule } from './bar/bar.module';
import { FooBarModule } from './foo-bar/foo-bar.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MulterModule.register({dest: './uploads'}),
    HealthModule,
    AuthModule,
    FooModule,
    BarModule,
    FooBarModule,
    ProductModule,
    CategoryModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
