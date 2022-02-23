import {
  Get,
  Put,
  Req,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from './user.interface';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RequireAuth } from '@guards/auth.guard';
import { ListUserInput } from './dto/list-users.dto';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { StatusCodes } from '@modules/_base/base.interface';
import { DetailInput } from '@modules/_base/dto/detail-input.dto';
import { ListResponse } from '@modules/_base/dto/list-response.dto';
import { BaseResponse } from '@modules/_base/dto/base-response.dto';
import { BooleanResponse } from '@modules/_base/dto/bool-response.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get users
   *
   * @param {ListUserInput} body
   * @returns {Promise<ListResponse<User>>}
   */
  @Get()
  @UseGuards(RequireAuth)
  async getAllUsers(
    @Query() query: ListUserInput,
  ): Promise<ListResponse<User>> {
    const data = await this.userService.get(query);

    return {
      status: StatusCodes.SUCCESS,
      ...data,
    };
  }

  /**
   * Create user
   *
   * @param {CreateUserInput} body
   * @returns {Promise<BaseResponse<User>>}
   */
  @Post()
  @UseGuards(RequireAuth)
  async createUser(
    @Body() body: CreateUserInput,
    @Req() req: Request & { user: User },
  ): Promise<BaseResponse<User>> {
    const data = await this.userService.create(body, req.user);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Get one user
   *
   * @param {DetailUserInput} body
   * @returns {Promise<BaseResponse<User>>}
   */
  @Get('/:id')
  @UseGuards(RequireAuth)
  async getOneUser(@Param() param: DetailInput): Promise<BaseResponse<User>> {
    const data = await this.userService.getOne(param);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Update user
   *
   * @param {DetailUserInput} param
   * @param {UpdateUserInput} body
   * @returns {Promise<BaseResponse<User>>}
   */
  @Put('/:id')
  @UseGuards(RequireAuth)
  async updateEmployee(
    @Param() param: DetailInput,
    @Body() body: UpdateUserInput,
    @Req() req: Request & { user: User },
  ): Promise<BaseResponse<User>> {
    const data = await this.userService.update(param, body, req.user);
    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Delete user
   *
   * @param {DetailUserInput} param
   * @returns {Promise<BooleanResponse>}
   */
  @Delete('/:id')
  @UseGuards(RequireAuth)
  async deleteUser(
    @Param() param: DetailInput,
    @Req() req: Request & { user: User },
  ): Promise<BooleanResponse> {
    const data = await this.userService.delete(param, req.user);
    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }
}
