import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { BookingsService } from '../services/bookings.service';
import { CreateBookingDto } from '../dtos';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  @Get()
  async getBookings() {
    return this.bookingsService.getBookings();
  }

  @Post()
  async createBooking(@Body() body: CreateBookingDto) {
    try {
      const bookingId = await this.bookingsService.createBooking(body);
      return {
        bookingId
      }
    } catch (err) {
      console.log(err)
      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }
  }
}
