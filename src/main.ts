import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adding validation pipes globally to cut down code on the controller level
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
