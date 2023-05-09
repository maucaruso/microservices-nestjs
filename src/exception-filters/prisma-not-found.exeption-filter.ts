import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaNotFoundExceptionFIlter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const messageError = exception?.meta?.cause ?? exception.message;

    if (exception.code === 'P2025') {
      response.status(404).json({
        statusCode: 404,
        message: messageError,
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        message: messageError,
      });
    }
  }
}
