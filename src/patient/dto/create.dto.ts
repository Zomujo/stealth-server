import {
  ApiProperty,
  ApiResponseProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { GenericResponseDto } from '../../shared/docs/dto/base.dto';
import { IsNotEmpty, MaxDate } from 'class-validator';
import { Type } from 'class-transformer';
import { format } from 'date-fns';

export class CreatePatientDto {
  @ApiProperty({
    example: 'Paul Billings',
    description: 'Name of the patient',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'gh-56387082875',
    description: 'Identification number on nhis or ghana card',
  })
  @IsNotEmpty()
  cardIdentificationNumber: string;

  @ApiProperty({
    example: format(new Date(), 'yyyy-MM-dd'),
    description: 'Date of birth of the patient',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @MaxDate(new Date())
  dateOfBirth: Date;
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
