import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export interface CheckSeatAvailabilityRequest {
    flightId: string;
    requiredSeats: number;
}

// Respuesta de disponibilidad de asientos
export interface CheckSeatAvailabilityResponse {
    availableSeats: number;
    isAvailable: boolean;
}

export interface AuthorizePaymentRequest {
    bookingId: string,
    amount: number
}

export interface AuthorizePaymentResponse {
    authorize: boolean
}


//bookings.controller

export class CreateBookingDto {
    @IsNotEmpty()
    @IsString()
    readonly flightId: string;  // ID del vuelo, podrías ajustar el tipo si es number

    @IsNotEmpty()
    @IsNumber()
    readonly numberOfSeats: number;

    @IsNotEmpty()
    @IsString()
    readonly customerName: string;

    @IsNotEmpty()
    @IsNumber()
    readonly totalPrice: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PassengerDto)  // Transforma el array de objetos a la clase PassengerDto
    readonly passengers: PassengerDto[];
}

export class PassengerDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;  // Nombre del pasajero

    @IsNotEmpty()
    @IsString()
    readonly seatNumber: string;  // Número de asiento
}