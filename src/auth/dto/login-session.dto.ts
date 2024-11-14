import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class LocationDto {
  @ApiProperty({
    example: '5.614818',
    description: 'Latitude of the device',
  })
  @IsNotEmpty()
  latitude: string;

  @ApiProperty({
    example: '-0.205874',
    description: 'Longitude of the device',
  })
  @IsNotEmpty()
  longitude: string;
}

export class CreateLoginSessionDto {
  @ApiProperty({
    example: 'Chrome - Mac OS X',
    description: 'browser from which login was attempted',
  })
  @IsNotEmpty()
  browser: string;

  @ApiProperty({
    type: LocationDto,
    description: 'location of the device from which login was attempted',
  })
  @IsNotEmpty()
  locationBody: LocationDto;
}
