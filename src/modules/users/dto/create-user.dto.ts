import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    required: true,
    example: 'user1',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'email',
    required: true,
    example: 'user1@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'password',
    required: true,
    example: '123',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'address',
    required: true,
    example: 'vietnam',
  })
  address: string;
}
