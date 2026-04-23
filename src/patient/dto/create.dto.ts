import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { GenericResponseDto } from '../../core/shared/dto/base.dto';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxDate,
  MinLength,
} from 'class-validator';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
import { Type } from 'class-transformer';
import { format } from 'date-fns';

export class CreatePatientDto {
  @ApiProperty({
    example: 'Paul Billings',
    description: 'Name of the patient',
  })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'gh-56387082875',
    description: 'Primary Identification number of patient',
  })
  @IsOptional()
  cardIdentificationNumber: string;

  @ApiPropertyOptional({
    example: 'f59b8418-ace4-4488-bf74-441ba47aa150',
    description: "The patient's queue unique id",
  })
  @IsOptional()
  @IsUUID(4)
  queueUniqueId: string;

  @ApiPropertyOptional({
    example: '45876378475',
    description: 'Secondary Identification number of patient',
  })
  @IsOptional()
  secondaryIdentificationNumber: string;

  @ApiProperty({
    example: format(new Date(), 'yyyy-MM-dd'),
    description: 'Date of birth of the patient',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @MaxDate(new Date(Date.now()))
  dateOfBirth: Date;

  @ApiPropertyOptional({
    example: 'Hypertension',
    description: 'Diagnosis of the patient',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  diagnosis: string;

  @ApiPropertyOptional({
    enum: Gender,
    example: Gender.MALE,
    description: 'Gender of the patient',
  })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional({
    example: 70,
    description: 'Weight of the patient in kg',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight: number;
}

export class CreatePatientResponseDto extends IntersectionType(
  CreatePatientDto,
  GenericResponseDto,
) {
  @ApiResponseProperty({
    example: null,
  })
  deletedAt: Date;

  @ApiResponseProperty({
    example: null,
  })
  deletedBy: string;
}
