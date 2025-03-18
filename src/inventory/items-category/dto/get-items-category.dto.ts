import { IntersectionType } from '@nestjs/swagger';
import { GenericResponseDto } from 'src/core/shared/docs/dto/base.dto';
import { ItemCategory } from '../models/items-category.model';

export class ItemCategoryResponse extends IntersectionType(
  ItemCategory,
  GenericResponseDto,
) {}
