import { clone } from 'lodash';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { User } from './user.interface';
import { BaseStatus } from '../_base/base.interface';

const ObjectId = mongoose.Types.ObjectId;

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: {
      type: String,
      select: false,
    },
    address: String,
    status: {
      type: String,
      default: BaseStatus.ACTIVE,
      enum: Object.values(BaseStatus),
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: ObjectId,
      ref: 'User',
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { strict: false },
);

/**
 * Password hash middleware.
 */
UserSchema.pre('save', async function save(next) {
  try {
    const user = clone(this);
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.matchPassword = async function (enteredPassword, password) {
  return await bcrypt.compareSync(enteredPassword, password);
};

export const UserModel = mongoose.model<User>('User', UserSchema, 'Users');
