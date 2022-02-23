import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { generateUserToken } from '@utils/jwt';
import { UserError } from '@helper/error.helpers';
import { LoginInput } from './dto/login-input.dto';
import { User } from '@modules/users/user.interface';
import { IDTokenPayload } from './dto/token-payload.dto';
import { BaseStatus, StatusCodes } from '@modules/_base/base.interface';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async login(params: LoginInput): Promise<IDTokenPayload> {
    const { email, password } = params;

    const user = await this.userModel
      .findOne({
        email,
        deletedAt: null,
      })
      .select('+password');

    if (!user || user.status !== BaseStatus.ACTIVE)
      throw new UserError(StatusCodes.INVALID_CREDENTIALS);

    const checkPassword = await user.matchPassword(password, user.password);
    if (!checkPassword) {
      throw new UserError(StatusCodes.INVALID_CREDENTIALS);
    }

    return {
      token: generateUserToken({
        userId: user._id,
      }),
      user,
    };
  }
}
