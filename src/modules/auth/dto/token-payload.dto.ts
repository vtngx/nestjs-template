import { User } from '@modules/users/user.interface';

export class IDTokenPayload {
  token: string;
  user: User;
}
