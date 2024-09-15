import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CheckSeatAvailabilityResponse } from '../dtos';
import { Flight } from '../entities/flight';

@Injectable()
export class FlightsService {

    constructor(
        @Inject('FLIGHTS_SERVICE') private readonly client: ClientProxy,
    ) { }


    async checkSeatAvailability(flightId: string, requiredSeats: number): Promise<CheckSeatAvailabilityResponse> {
        return await lastValueFrom(
            this.client.send<CheckSeatAvailabilityResponse>('check_seat_availability', {
                flightId,
                requiredSeats,
            })
        )
    }

    async getFlight(flightId: string): Promise<Flight> {
        return await lastValueFrom(
            this.client.send<Flight>('get_flight', flightId)
        );
    }

    updateAvailableSeats(flightId: string, requiredSeats: number) {
        this.client.emit('update_available_seats', {
            flightId,
            requiredSeats
        })
    }
}
