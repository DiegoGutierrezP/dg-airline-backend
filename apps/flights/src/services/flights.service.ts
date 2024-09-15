import { Injectable } from '@nestjs/common';
import { CheckSeatAvailabilityResponse, FlightsFilterRequest } from '../dtos';
import { FlightRepository } from '../repositories/flight.repository';

@Injectable()
export class FlightsService {
  constructor(private readonly flightRepository: FlightRepository) { }

  getFlights(query: FlightsFilterRequest) {
    const flights = this.flightRepository.where({
      destination: query.destination,
      origin: query.origin,
      // departureDate: query.date
    });

    return flights;
  }

  getFlight(flightId: string) {
    const flight = this.flightRepository.getById(flightId);

    if (!flight)
      throw new Error('Flight not found');

    return flight;
  }

  // Verificar disponibilidad de asientos
  checkSeatAvailability(flightId: string, requiredSeats: number): CheckSeatAvailabilityResponse {
    const flight = this.flightRepository.getById(flightId);

    if (!flight)
      throw new Error('Flight not found');

    const isAvailable = flight.availableSeats >= requiredSeats;

    return {
      availableSeats: flight.availableSeats,
      isAvailable,
    };
  }



  updateAvailableSeats(flightId: string, requiredSeats: number) {
    let flight = this.flightRepository.getById(flightId);

    if (!flight)
      throw new Error('Flight not found');

    flight.availableSeats -= requiredSeats

    this.flightRepository.update(flight)
  }

  getHello(): string {
    return 'Hello World!';
  }
}
