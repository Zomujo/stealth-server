import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SuppliersService } from '../../inventory/suppliers/suppliers.service';

@ValidatorConstraint({ name: 'SupplierExists', async: true })
@Injectable()
export class SupplierExistsRule implements ValidatorConstraintInterface {
  constructor(private supplierService: SuppliersService) {}
  async validate(value: string) {
    try {
      await this.supplierService.findOne(value);
    } catch (_error) {
      return false;
    }
    return true;
  }

  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'Supplier does not exist';
  }
}

export function SupplierExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'SupplierExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: SupplierExistsRule,
    });
  };
}
