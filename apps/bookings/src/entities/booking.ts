import { randomUUID } from "crypto";
import { Flight } from "./flight";

export enum BookingStatus {
    PENDING = 1,
    DONE = 2,
    CANCELED = 3
}

export enum BookingPaymentStatus {
    PENDING = 1,
    PAID = 2,
}

export class Booking {
    private _id: string;
    flight: Flight;
    customerName: string; // Nombre del cliente que realiza la compra
    seats: number;        // Número de asientos comprados
    totalPrice: number;   // Precio total de la compra

    paymentStatus: BookingPaymentStatus;
    status: BookingStatus

    constructor(
        flight: Flight,
        customerName: string,
        seats: number,
        totalPrice: number,
    ) {
        this._id = randomUUID();
        this.flight = flight;
        this.customerName = customerName;
        this.seats = seats;
        this.totalPrice = totalPrice;

        this.paymentStatus = BookingPaymentStatus.PENDING;
        this.status = BookingStatus.PENDING
    }

    get id(): string {
        return this._id;
    }
}