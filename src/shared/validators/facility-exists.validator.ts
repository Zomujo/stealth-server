import { Injectable } from '@nestjs/common';
import { FacilityService } from '../../admin/facility/facility.service';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'FacilityExists', async: true })
@Injectable()
export class FacilityExistsRule implements ValidatorConstraintInterface {
  constructor(private facilityService: FacilityService) {}

  async validate(value: string) {
    try {
      await this.facilityService.findOne(value);
    } catch (_e) {
      return false;
    }
    return true;
  }

  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'Facility does not exist';
  }
}

export function FacilityExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'FacilityExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: FacilityExistsRule,
    });
  };
}
