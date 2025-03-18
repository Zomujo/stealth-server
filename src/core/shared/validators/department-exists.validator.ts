import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DepartmentService } from '../../../admin/department/department.service';

@ValidatorConstraint({ name: 'DepartmentExists', async: true })
@Injectable()
export class DepartmentExistsRule implements ValidatorConstraintInterface {
  constructor(private departmentService: DepartmentService) {}
  async validate(value: string) {
    try {
      await this.departmentService.findOne(value);
    } catch (_e) {
      return false;
    }
    return true;
  }

  defaultMessage(_validationArguments?: ValidationArguments): string {
    return `Department does not exist`;
  }
}

export function DepartmentExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'DepartmentExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DepartmentExistsRule,
    });
  };
}
