import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BatchService } from '../../inventory/items/batches/batch.service';

@ValidatorConstraint({ name: 'BatchExists', async: true })
@Injectable()
export class BatchExistsRule implements ValidatorConstraintInterface {
  constructor(private batchService: BatchService) {}

  async validate(value: string) {
    try {
      await this.batchService.findIndividual(value);
    } catch (_error) {
      return false;
    }
    return true;
  }

  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'Batch does not exist';
  }
}

export function BatchExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'BatchExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: BatchExistsRule,
    });
  };
}
