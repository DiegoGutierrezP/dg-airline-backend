import { randomUUID } from "crypto";

export enum FlightStatus {
    AVAILABLE = 1,
    NOT_AVAILABLE = 2
}

export class Flight {
    private _id: string;
    origin: string;
    destination: string;
    departureDate: Date;
    arrivalDate: Date;
    flightNumber: string;
    price: number;
    totalSeats: number;
    availableSeats: number;
    status: FlightStatus

    constructor(
        flightNumber: string,
        origin: string,
        destination: string,
        departureDate: Date,
        arrivalDate: Date,
        price: number,
        totalSeats: number,
        id?: string,
    ) {
        this._id = id ?? randomUUID();
        this.flightNumber = flightNumber;
        this.origin = origin;
        this.destination = destination;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.price = price;
        this.totalSeats = totalSeats;
        this.availableSeats = totalSeats;
        this.status = FlightStatus.AVAILABLE
    }

    get id(): string {
        return this._id;
    }
}