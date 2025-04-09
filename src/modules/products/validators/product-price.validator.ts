import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { applyDecorators } from '@nestjs/common';

export function PriceValidator() {
  return applyDecorators(
    IsNotEmpty({ message: 'Price must be a valid number.' }),
    IsNumber(),
    Min(0, { message: 'Price cannot be negative' }),
  );
}