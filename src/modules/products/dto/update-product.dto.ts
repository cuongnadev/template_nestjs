import { IsOptional } from 'class-validator';
import { ProdcutNameValidator } from '../validators/product-name.validator';
import { PriceValidator } from '../validators/product-price.validator';
export default class UpdateProductDTO {
  id: number;

  @ProdcutNameValidator({ uppercase: false })
  name: string;

  @PriceValidator()
  price: number;

  @IsOptional()
  description?: string;
}
