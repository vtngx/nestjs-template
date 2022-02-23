import {
  HttpStatus,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { decodeToken } from '../utils/jwt';
import { UserError } from '../helpers/error.helpers';
import { UserService } from '../modules/users/user.service';
import { StatusCodes } from '../modules/_base/base.interface';

@Injectable()
export class RequireAuth implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.headers || !req.headers.authorization)
      throw new UserError(StatusCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);

    const decoded = await this.validateToken(req.headers.authorization);
    if (!decoded || !decoded.userId)
      throw new UserError(StatusCodes.INVALID_TOKEN, HttpStatus.FORBIDDEN);

    const user = await this.userService.getOne({ id: decoded.userId });

    if (user) req.user = user;
    else throw new UserError(StatusCodes.INVALID_TOKEN, HttpStatus.FORBIDDEN);

    return true;
  }

  async validateToken(auth: string) {
    try {
      if (auth.split(' ')[0] !== 'Bearer')
        throw new UserError(StatusCodes.INVALID_TOKEN, HttpStatus.FORBIDDEN);

      const token = auth.split(' ')[1];
      const decoded = await decodeToken(token);

      return decoded;
    } catch (error) {
      console.log('validateToken error: ', error);
      throw new UserError(StatusCodes.INVALID_TOKEN, HttpStatus.FORBIDDEN);
    }
  }
}
