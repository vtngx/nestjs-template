import { omit } from 'lodash';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserError } from '@helper/error.helpers';
import { ListUserInput } from './dto/list-users.dto';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { StatusCodes } from '@modules/_base/base.interface';
import { DetailInput } from '@modules/_base/dto/detail-input.dto';
import { ListResponse } from '@modules/_base/dto/list-response.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async get(query: ListUserInput): Promise<ListResponse<User>> {
    let { page, limit } = query;
    const { status, search } = query;

    page = Number(page) || 1;
    limit = Number(limit) || 20;
    const skip = (Number(page) - 1) * Number(limit);
    const conditions: any = {
      deletedAt: null,
    };

    if (search)
      conditions.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { email: { $regex: search.trim(), $options: 'i' } },
      ];

    if (status) conditions.status = status;

    const [data, total] = await Promise.all([
      this.userModel
        .find(conditions)
        .skip(skip)
        .limit(Number(limit))
        .sort({ _id: -1 })
        .lean<[User]>()
        .exec(),
      this.userModel.countDocuments(conditions).exec(),
    ]);

    return { total, data };
  }

  async getOne({ id }: DetailInput): Promise<User> {
    const user = await this.userModel
      .findOne({
        _id: id,
        deletedAt: null,
      })
      .lean<User>()
      .exec();

    if (!user) throw new UserError(StatusCodes.USER_DO_NOT_EXISTS);

    return user;
  }

  async create(body: CreateUserInput, reqUser: User): Promise<User> {
    const { email } = body;

    const existingUser = await this.userModel.findOne({
      email,
      deletedAt: null,
    });

    if (existingUser) {
      throw new UserError(StatusCodes.EMAIL_ALREADY_EXISTS);
    }

    const user = new this.userModel({
      ...body,
      createdBy: reqUser._id,
    });
    return await user.save();
  }

  async update(
    { id }: DetailInput,
    body: UpdateUserInput,
    reqUser: User,
  ): Promise<User> {
    const user = await this.userModel
      .findOne({
        _id: id,
        deletedAt: null,
      })
      .select('+password');

    if (!user) throw new UserError(StatusCodes.USER_DO_NOT_EXISTS);

    user.set({
      ...body,
      updatedAt: new Date(),
      updatedBy: reqUser._id,
    });
    await user.save();

    return omit({ ...user }['_doc'], ['password']);
  }

  async delete({ id }: DetailInput, reqUser: User): Promise<boolean> {
    const user = await this.userModel.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!user) throw new UserError(StatusCodes.USER_DO_NOT_EXISTS);

    user.set({
      deletedAt: new Date(),
      updatedAt: new Date(),
      updatedBy: reqUser._id,
    });
    await user.save();

    return !!user.deletedAt;
  }
}
