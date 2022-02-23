import { BaseStatus } from '../_base/base.interface';

export interface User extends Document {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly address: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
  readonly createdBy: string;
  readonly updatedBy: string;
  readonly status: BaseStatus;
  password: string;
  
  // methods
  matchPassword: Function;
}
