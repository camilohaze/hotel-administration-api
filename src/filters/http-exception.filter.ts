import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { url, ip, method, params, body, hostname } =
      ctx.getRequest<Request>();
    const statusCode = exception.getStatus();

    response.status(statusCode).json({
      statusCode,
      path: url,
      method,
      params,
      body,
      ip,
      hostname,
      timestamp: new Date().toISOString(),
    });
  }
}
