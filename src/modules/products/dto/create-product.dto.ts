import { IsOptional } from 'class-validator';
import { ProdcutNameValidator } from '../validators/product-name.validator';
import { PriceValidator } from '../validators/product-price.validator';

export default class CreateProductDTO {
  @ProdcutNameValidator()
  name: string;

  @PriceValidator()
  price: number;

  @IsOptional()
  description?: string;
}
