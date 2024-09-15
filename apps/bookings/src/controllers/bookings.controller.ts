import { Body, Controller, Get, Post } from '@nestjs/common';
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
    await this.bookingsService.createBooking(body);
  }
}
