import { 
    ExceptionFilter, 
    Catch, 
    ArgumentsHost, 
    HttpException 
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
  
      response.status(status).json({
        success: false,
        message: exception.message,
        error: exception.getResponse()['error'] || 'Error',
        statusCode: status
      });
    }
  }