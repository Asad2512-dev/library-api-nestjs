import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.message || 'Internal server error';
    let errors: any = null;

    if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      if (typeof res === 'object') {
        message = res.message || message;
        errors = res.errors || null;
        if (Array.isArray(res.message)) {
          message = res.message[0]; // Take the first validation error as primary message
          errors = res.message;
        }
      }
    } else {
      // Log details for unexpected errors in a real production system
      console.error('Unhandled Exception:', exception);
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      errors,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
