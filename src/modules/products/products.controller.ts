import {
  ArgumentMetadata,
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  PipeTransform,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/entities/product.entity';
import CreateProductDTO from './dto/create-product.dto';
import UpdateProductDTO from './dto/update-product.dto';
import { REQUEST } from '@nestjs/core';

class ValidationPipe implements PipeTransform {
  constructor(@Inject (REQUEST) private readonly request: Request) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const id = this.request['params'].id;
    const { name } = value;
    if(name === 'Macbook Pro' && +id === 1) {
      throw new BadGatewayException("Name invalid!");
    }
    return value;
  }
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<Product | null> {
    const product = await this.productsService.getProduct(+id);
    if(!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }
    return product;
  }

  @Post()
  createProduct(@Body() productData: CreateProductDTO): Promise<Product> {
    return this.productsService.create(productData);
  }

  @Patch('/:id')
  update(
    @Body(ValidationPipe) productData: UpdateProductDTO,
    @Param('id') id: string,
  ): Promise<Product | null> {
    return this.productsService.update(+id, productData);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Product | null> {
    const product = await this.productsService.delete(+id);
    if(!product) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }
    return product;
  }
}
