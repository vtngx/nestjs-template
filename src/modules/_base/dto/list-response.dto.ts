import { ApiProperty } from '@nestjs/swagger';
import { StatusCodes } from '../base.interface';

export class ListResponse<T> {
  @ApiProperty({ description: 'status' })
  status?: StatusCodes;

  @ApiProperty({
    description: 'total number of records',
    required: true,
  })
  total: number;

  @ApiProperty({
    description: 'data',
    required: true,
  })
  data: T[];
}
