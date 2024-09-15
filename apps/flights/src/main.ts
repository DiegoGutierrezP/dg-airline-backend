import { NestFactory } from '@nestjs/core';
import { FlightsModule } from './flights.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(FlightsModule);
  // await app.listen(3000);

  const app = await NestFactory.create(FlightsModule);

  // Configuración del microservicio
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'flights_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  // Inicia el servidor HTTP
  await app.listen(3000);

  // Inicia el microservicio
  await app.startAllMicroservices();

}
bootstrap();
