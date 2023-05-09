import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaNotFoundExceptionFIlter } from './exception-filters/prisma-not-found.exeption-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );

  app.useGlobalFilters(new PrismaNotFoundExceptionFIlter());

  await app.listen(3000);
}
bootstrap();
