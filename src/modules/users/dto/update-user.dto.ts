import { ApiProperty } from '@nestjs/swagger';
import { BaseStatus } from '@modules/_base/base.interface';
import { IsIn, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    required: true,
    example: 'user1 updated',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'address',
    required: true,
    example: 'vietnam',
  })
  address: string;

  @IsNotEmpty()
  @IsIn(Object.values(BaseStatus))
  @ApiProperty({
    description: 'status',
    required: true,
    example: BaseStatus.INACTIVE,
  })
  status: BaseStatus;
}
