import { ApiProperty } from '@nestjs/swagger';
import { BaseStatus } from '@modules/_base/base.interface';
import { IsEnum, IsString, IsOptional, IsNumberString } from 'class-validator';

export class ListUserInput {
  @IsOptional()
  @IsNumberString({})
  @ApiProperty({
    description: 'page',
    example: 1,
  })
  page: number;

  @IsOptional()
  @IsNumberString({})
  @ApiProperty({
    description: 'limit',
    example: 20,
  })
  limit: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'search',
    example: '',
  })
  search: string;

  @IsOptional()
  @IsEnum(BaseStatus)
  @ApiProperty({
    description: 'status',
    example: BaseStatus.ACTIVE,
  })
  status: BaseStatus;
}
