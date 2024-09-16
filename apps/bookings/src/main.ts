import { NestFactory } from '@nestjs/core';
import { BookingsModule } from './bookings.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BookingsModule);
  app.useGlobalPipes(new ValidationPipe()); // Activar validación de DTOs

  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  })

  await app.listen(3000);
}
bootstrap();
