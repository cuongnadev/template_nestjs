import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class isUppercase implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    if (typeof value !== 'string') return false;
    return value === value.toLocaleUpperCase();
  }
}
