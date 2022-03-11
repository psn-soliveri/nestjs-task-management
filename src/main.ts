import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
// TODO: Better logging package https://github.com/iamolegga/nestjs-pino
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  // IMPORTANT: ONLY DONE FOR THE PERPOSE OF THIS COURSE
  app.enableCors();

  // Adding validation pipes globally to cut down code on the controller level
  app.useGlobalPipes(new ValidationPipe());

  // Adding custom global interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = 3000;
  await app.listen(port);

  logger.log(`application listening on port ${port}`);
}
bootstrap();
