import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ItemService } from '../../../inventory/items/items.service';

@ValidatorConstraint({ name: 'ItemExists', async: true })
@Injectable()
export class ItemExistsRule implements ValidatorConstraintInterface {
  constructor(private itemService: ItemService) {}
  async validate(value: string) {
    try {
      await this.itemService.findOne(value);
    } catch (_e) {
      return false;
    }
    return true;
  }

  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'Item does not exist';
  }
}

export function ItemExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ItemExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ItemExistsRule,
    });
  };
}
