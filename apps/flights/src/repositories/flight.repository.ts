import { Flight } from "../entities/flight";


export class FlightRepository {
    private flights: Flight[] = [
        new Flight(
            'LA2510',
            'Lima',
            'Cusco',
            new Date('2024-09-20T08:00:00'),
            new Date('2024-09-20T09:30:00'),
            120,
            50,
            '1'
        ),
        new Flight(
            'LA2540',
            'Lima',
            'Arequipa',
            new Date('2024-09-21T10:00:00'),
            new Date('2024-09-21T11:30:00'),
            105,
            29,
            '2'
        ),
        new Flight(
            'LA2541',
            'Lima',
            'Arequipa',
            new Date('2024-09-21T14:00:00'),
            new Date('2024-09-21T15:30:00'),
            100,
            50,
            '23'
        ),
        new Flight(
            'LA2765',
            'Lima',
            'Piura',
            new Date('2024-09-22T14:00:00'),
            new Date('2024-09-22T15:45:00'),
            90,
            20,
            '3'
        ),
        new Flight(
            'LA2880',
            'Cusco',
            'Lima',
            new Date('2024-09-23T16:00:00'),
            new Date('2024-09-23T17:30:00'),
            120,
            8,
            '4'
        ),
        new Flight(
            'LA3005',
            'Arequipa',
            'Lima',
            new Date('2024-09-24T12:00:00'),
            new Date('2024-09-24T13:30:00'),
            100,
            10,
            '5'
        ),
    ];

    all(): Flight[] {
        return this.flights;
    }

    getById(id: string): Flight | undefined {
        return this.flights.find(f => f.id === id);
    }

    update(flight: Flight): void {
        const index = this.flights.findIndex((p) => p.id === flight.id);
        if (index < 0) throw new Error('Flight Not found');
        this.flights[index] = flight;
    }

    where(filter: Partial<Flight>): Flight[] {
        return this.flights.filter(flight => {
            return Object.keys(filter).every(key => {
                const filterValue = (filter as any)[key];
                const flightValue = (flight as any)[key];

                // Compara propiedades si están definidas en el filtro
                if (filterValue !== undefined && filterValue !== null) {
                    // Si el valor es una fecha, hacer comparación especial para fechas
                    if (flightValue instanceof Date && filterValue instanceof Date) {
                        return flightValue.setHours(0, 0, 0, 0) === filterValue.setHours(0, 0, 0, 0);
                    }
                    return flightValue === filterValue;
                }
                return true; // Si la propiedad no está en el filtro, no se filtra por ella
            });
        });
    }
}
