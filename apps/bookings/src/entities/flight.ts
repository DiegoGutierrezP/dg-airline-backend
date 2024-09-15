import { randomUUID } from "crypto";

export enum FlightStatus {
    AVAILABLE = 1,
    NOT_AVAILABLE = 2
}

export class Flight {
    _id: string;
    id: string;
    origin: string;
    destination: string;
    departureDate: Date;
    arrivalDate: Date;
    flightNumber: string;
    price: number;
    totalSeats: number;
    availableSeats: number;
    status: FlightStatus
}