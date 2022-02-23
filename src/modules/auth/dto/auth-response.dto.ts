import { ApiProperty } from '@nestjs/swagger';
import { User } from '@modules/users/user.interface';
import { StatusCodes } from '@modules/_base/base.interface';

export class AuthResponse {
  @ApiProperty({
    description: 'status',
    required: true,
  })
  status: StatusCodes;

  @ApiProperty({
    description: 'logged-in user',
  })
  user?: User;

  @ApiProperty({
    description: 'token',
  })
  token?: string;

  @ApiProperty({
    description: 'data',
  })
  data?: User;
}
