import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export interface CheckSeatAvailabilityResponse {
    availableSeats: number;
    isAvailable: boolean;
}

export interface CheckSeatAvailabilityRequest {
    flightId: string;
    requiredSeats: number;
}

export interface UpdateAvailableSeatsRequest {
    flightId: string;
    requiredSeats: number;
}

//

export class FlightsFilterRequest {
    @IsNotEmpty()
    @IsString()
    readonly origin: string;  // ID del vuelo, podrías ajustar el tipo si es number

    @IsNotEmpty()
    @IsString()
    readonly destination: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    readonly date: Date;
}