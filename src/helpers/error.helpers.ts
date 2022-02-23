import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from '@modules/_base/base.interface';

export class UserError extends HttpException {
  constructor(status: StatusCodes, code?: HttpStatus) {
    super({ status }, code || HttpStatus.BAD_REQUEST);
  }
}

export class UserErrorModule extends HttpException {
  constructor(status: string, message?: string, code?: HttpStatus) {
    super({ status, message }, code || HttpStatus.BAD_REQUEST);
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof HttpException)
      return response.json(exception.getResponse());

    return response.json({
      status: this.mapStatusCode(exception),
      message: exception.message,
      stacktrace: exception.stack,
    });
  }

  mapStatusCode(exception: Error): StatusCodes {
    if (exception.name === 'ValidationError')
      return StatusCodes.VALIDATION_ERROR;

    return StatusCodes.FAILURE;
  }
}
