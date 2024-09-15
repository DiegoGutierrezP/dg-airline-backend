import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(PaymentsModule);
  // await app.listen(3000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentsModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'], // Asegúrate de que esto coincida con la URL de RabbitMQ en tu Docker Compose
      queue: 'payments_queue', // O el nombre de la cola que estás utilizando
      queueOptions: {
        durable: true, // Configura esto según tus necesidades
      },
    },
  });

  await app.listen();

}
bootstrap();
