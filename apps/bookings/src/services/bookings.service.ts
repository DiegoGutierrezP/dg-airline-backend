import { Inject, Injectable } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { FlightsService } from './flights.service';
import { BookingRepository } from '../repositories/booking.repository';
import { PassengerRepository } from '../repositories/passenger.repository';
import { CreateBookingDto } from '../dtos';
import { Booking, BookingPaymentStatus, BookingStatus } from '../entities/booking';
import { Passenger } from '../entities/passenger';

@Injectable()
export class BookingsService {

  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly flightsService: FlightsService,
    private readonly bookingsRepository: BookingRepository,
    private readonly passengerRepository: PassengerRepository
  ) { }

  getBookings() {
    return this.bookingsRepository.all()
  }

  async createBooking(body: CreateBookingDto) {

    const flight = await this.flightsService.getFlight(body.flightId);

    if (flight.availableSeats < body.numberOfSeats)
      throw new Error('Not enough seats available');

    //create booking
    const booking = this.bookingsRepository.create(new Booking(
      flight,
      body.customerName,
      body.numberOfSeats,
      body.totalPrice,
    ))

    //create booking passenger
    // for (const pass of body.passengers) {
    //   this.passengerRepository.create(new Passenger(
    //     booking.id,
    //     pass.seatNumber,
    //     pass.name
    //   ))
    // }

    const isAuthorized = await this.paymentsService.authorizePayment({
      bookingId: booking.id,
      cardNumber: body.cardNumber,
      amount: body.totalPrice
    });

    //update booking info
    if (isAuthorized) {
      booking.paymentStatus = BookingPaymentStatus.PAID;
      booking.status = BookingStatus.DONE;
    } else {
      booking.paymentStatus = BookingPaymentStatus.PENDING;
      booking.status = BookingStatus.CANCELED;
    }

    this.bookingsRepository.update(booking)

    if (isAuthorized) {
      this.flightsService.updateAvailableSeats(flight._id, booking.seats);
    } else {
      throw new Error('Número de tarjeta invalida');
    }

    return booking.id
  }
}
