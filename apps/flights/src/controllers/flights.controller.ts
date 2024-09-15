import { Body, Controller, Get, Patch, Put, Query } from '@nestjs/common';
import { FlightsService } from '../services/flights.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CheckSeatAvailabilityRequest, CheckSeatAvailabilityResponse, FlightsFilterRequest, UpdateAvailableSeatsRequest } from '../dtos';
import { Flight } from '../entities/flight';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) { }

  @Get()
  getFlights(@Query() query: FlightsFilterRequest) {
    return this.flightsService.getFlights(query);
  }

  @Patch('/available-seats')//for test purposes
  putAvailableSeats(@Body() body: UpdateAvailableSeatsRequest) {
    return this.flightsService.updateAvailableSeats(body.flightId, body.requiredSeats);
  }

  @MessagePattern('check_seat_availability')
  handleCheckSeatAvailability(@Payload() data: CheckSeatAvailabilityRequest): CheckSeatAvailabilityResponse {
    const { flightId, requiredSeats } = data;
    return this.flightsService.checkSeatAvailability(flightId, requiredSeats);
  }

  @MessagePattern('get_flight')
  handleGetFlight(@Payload() flightId: string): Flight {
    return this.flightsService.getFlight(flightId);
  }

  // @MessagePattern('update_available_seats')
  @EventPattern('update_available_seats')
  handleUpdateAvailableSeats(@Payload() data: UpdateAvailableSeatsRequest) {
    return this.flightsService.updateAvailableSeats(data.flightId, data.requiredSeats);
  }
}
