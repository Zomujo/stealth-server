import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Matches } from "class-validator";

export class GetDrugsCategoryDto {
  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  @Matches(/(\w=\d)*/)
  order?: string;

  @IsOptional()
  search?: string;
}