import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FlightsController } from './controllers/flights.controller';
import { FlightsService } from './services/flights.service';
import { FlightRepository } from './repositories/flight.repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FLIGHTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'flights_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [FlightsController],
  providers: [FlightsService, FlightRepository],
})
export class FlightsModule { }
