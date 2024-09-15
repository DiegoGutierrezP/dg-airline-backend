import { Passenger } from "../entities/passenger";

export class PassengerRepository {
    private passengers: Passenger[] = [

    ];

    all(): Passenger[] {
        return this.passengers;
    }

    create(passenger: Passenger) {
        this.passengers.push(passenger);
        return passenger;
    }
}
