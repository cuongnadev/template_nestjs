import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { isUppercase } from 'src/utils/helper';

export function ProdcutNameValidator(options?: { uppercase?: boolean }) {
  const decorators = [
    IsNotEmpty({ message: 'Please enter product name.' }),
    IsString(),
    Length(3, 255, {
      message: 'Product name must be between 3 and 255 characters.',
    }),
  ];

  if (options?.uppercase !== false) {
    decorators.push(
      Validate(isUppercase, { message: 'Product name must be uppercase' }),
    );
  }

  return applyDecorators(...decorators);
}
