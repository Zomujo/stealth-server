import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';

export const GetQueries = createParamDecorator(async (data: ClassConstructor<any>, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();
  const query = request.query;

  // Transform query into DTO instance
  const instance = plainToInstance(data, query);

  const errors = await validate(instance);

  if (errors.length > 0) {
    throw new BadRequestException(`Validation failed: ${errors[0]}`)
  }
  
  return instance;
})