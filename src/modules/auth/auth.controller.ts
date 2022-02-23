import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { StatusCodes } from '@modules/_base/base.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login
   *
   * @param {LoginInput} body
   * @returns {Promise<AuthResponse>}
   */
  @Post('login')
  async login(@Body() body: LoginInput): Promise<AuthResponse> {
    const data = await this.authService.login(body);

    return {
      status: StatusCodes.SUCCESS,
      ...data,
    };
  }
}
