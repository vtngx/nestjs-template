import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class DetailInput {
  @IsNotEmpty()
  @IsObjectId({ message: 'Must be objectId' })
  @ApiProperty({ description: 'objectId', required: true })
  id: string;
}
