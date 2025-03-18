import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from 'class-validator';
import { ItemCategoryService } from '../../../inventory/items-category/items-category.service';

@ValidatorConstraint({ name: 'ItemCategoryExists', async: true })
@Injectable()
export class ItemCategoryExistsRule implements ValidatorConstraintInterface {
  constructor(private itemCategoryService: ItemCategoryService) {}
  async validate(value: string) {
    try {
      await this.itemCategoryService.findOne(value);
    } catch (_error) {
      return false;
    }
    return true;
  }

  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'Item category does not exist';
  }
}

export function ItemCategoryExists(validatorOptions?: ValidatorOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ItemCategoryExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validatorOptions,
      constraints: [],
      validator: ItemCategoryExistsRule,
    });
  };
}
