import { Booking } from "../entities/booking";

export class BookingRepository {
    private bookings: Booking[] = [

    ];

    all(): Booking[] {
        return this.bookings;
    }

    create(booking: Booking) {
        this.bookings.push(booking);
        return booking;
    }

    update(booking: Booking): void {
        const index = this.bookings.findIndex((p) => p.id === booking.id);
        if (index < 0) throw new Error('Booking Not found');
        this.bookings[index] = booking;
    }
}
