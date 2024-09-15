import { randomUUID } from "crypto";


export class Passenger {
    private _id: string;

    bookingId: string;     // Relación con la reserva
    seatNumber: string;    // Número del asiento
    passengerName: string; // Nombre del pasajero

    constructor(
        bookingId: string,
        seatNumber: string,
        passengerName: string,
    ) {
        this._id = randomUUID();
        this.bookingId = bookingId;
        this.seatNumber = seatNumber;
        this.passengerName = passengerName;
    }

    get id(): string {
        return this._id;
    }
}