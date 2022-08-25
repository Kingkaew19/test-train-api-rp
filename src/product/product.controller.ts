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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RequestDTO } from 'src/common/dto/request.dto';

import { ErrorInterceptor } from 'src/common/interceptor/error.interceptor';
import { ProductDTO } from './dto/procuct.dto';
import { ProductSearchDTO } from './dto/product-search.dto';
import { Public } from 'artifacts/auth/metadata/public.metadata';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';


@Controller('/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  async search(
    @Query() productSearchDTO: ProductSearchDTO,
  ): Promise<ResponseDTO<ProductDTO[]>> {
    return this.productService
      .search(productSearchDTO)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductService.name);
        throw new BadRequestException(err.message);
      });
  }
  

  @Public()
  @Get('/get/:id')
  @UseInterceptors(new ErrorInterceptor())
  getProduct(@Param('id') id: string): Promise<ResponseDTO<ProductDTO>> {
    return this.productService.read(id).then((result) => {
      const response = new ResponseDTO<ProductDTO>();
      response.data = result;

      return response;
    });
  }

  @Public()
  @Post('/create')
  @UseInterceptors(
    FileInterceptor('imagePath',{
      storage: 
        diskStorage({
          destination: './uploads',
            filename: (req, imagePath , callback) => {
                const uniq = Date.now()+'-'+ Math.round(Math.random() * 1e9);
                const ext = extname(imagePath.originalname);
                const filename = `${uniq}${ext}`;
                callback(null, filename);
            }
        })
      }
    ),
  )
  createProduct(@Body() productDTO: RequestDTO<ProductDTO>,
  ): Promise<ResponseDTO<ProductDTO>> {
    return this.productService
      .create(productDTO.data)
      .then((result) => {
      const response = new ResponseDTO<ProductDTO>();
      response.data = result;

      return response;
    })
    .catch((err) => {
      Logger.error(err, err.stack, ProductService.name);
      throw new BadRequestException(err.message);
    });
  }

  @Public()
  @Put()
  update(
    @Body() productDto: RequestDTO<ProductDTO>,
  ): Promise<ResponseDTO<ProductDTO>> {
    return this.productService
      .update(productDto.data)
      .then((result) => {
        const response = new ResponseDTO<ProductDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Public()
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.productService
      .delete(id)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Public()
  @Post('/upload/:id')
  @UseInterceptors(
    FileInterceptor('file',{
      storage: 
        diskStorage({
          destination: './uploads',
            filename: (req, file , callback) => {
              console.log('test', file);
                const uniq = Date.now()+'-'+ Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                const filename = `${uniq}${ext}`;
                callback(null, filename);
            }
        })
      }
    ),
    
  )
  handleUpload(@UploadedFile() file: Express.Multer.File,
  @Param('id') id: string) {
    return  this.productService
    .uploadFile(file, id)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      Logger.error(err, err.stack, ProductService.name);
      throw new BadRequestException(err.message);
    });
  }

  @Public()
  @Get('image/:file')
  async serveAvatar (@Param('file') fileId, @Res() res): Promise<any>{
    res.sendFile(fileId, {root: 'uploads'})
  }
}
