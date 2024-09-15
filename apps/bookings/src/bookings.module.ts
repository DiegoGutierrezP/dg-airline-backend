import { Module } from '@nestjs/common';
import { BookingsController } from './controllers/bookings.controller';
import { BookingsService } from './services/bookings.service';
import { BookingRepository } from './repositories/booking.repository';
import { PassengerRepository } from './repositories/passenger.repository';
import { PaymentsService } from './services/payments.service';
import { FlightsService } from './services/flights.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FLIGHTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'], // URL de RabbitMQ
          queue: 'flights_queue', // Nombre de la cola para recibir mensajes
          queueOptions: {
            durable: true, // La cola debe ser durable
          },
        },
      },
      {
        name: 'PAYMENTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'payments_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [BookingsController],
  providers: [
    BookingsService,
    BookingRepository,
    PassengerRepository,
    PaymentsService,
    FlightsService
  ],
})
export class BookingsModule { }
