import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'email',
    required: true,
    example: 'vietnh@vmodev.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'status',
    required: true,
    example: '123',
  })
  password: string;
}
