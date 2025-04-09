import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import CreateProductDTO from './dto/create-product.dto';
import UpdateProductDTO from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  getProduct(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    productData: Partial<Product>,
  ): Promise<Product | null> {
    productData.updated_at = new Date();
    await this.productRepository.update(id, productData);
    return this.getProduct(id);
  }

  async delete(id: number): Promise<Product | null> {
    const product = await this.getProduct(id);
    await this.productRepository.delete(id);
    return product;
  }
}
