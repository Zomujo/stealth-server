import { ApiProperty, ApiQuery, IntersectionType, } from "@nestjs/swagger";
import { CreateDrugDto } from "./create-drug.dto";
import { GenericResponseDto } from "src/shared/docs/dto/base.dto";

@ApiQuery({ name: 'find', required: false, type: Number })
export class GetDrugDto extends IntersectionType(GenericResponseDto) {
  @ApiProperty({ example: 10, description: 'The number of items to return',required: false})
  limit: number;

  @ApiProperty({ example: 1, description: 'The page number to return', required:false })
  page: number;

  @ApiProperty({ example: 'name', description: 'The field to search by', isArray: true, required: false })
  search: string;

  @ApiProperty({ example: 'laxatives', description: 'The dosage form of the drug', isArray: true, required: false })
  categories: string[];

  @ApiProperty({ example: 'name=order', description: 'The field to sort by', required: false })
  orderBy: string;
}

export class DrugResponse extends IntersectionType(CreateDrugDto) { }