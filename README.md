# AIRLINE WEBISTE BACKEND

Backend for dg-airline project, this project has microservices architecture using NestJS and RabbitMQ

To run this project, execute the following command

```bash
docker compose up --build
```

Make sure the services are running on the following ports

| Service  | Posrt |
| -------- | :---: |
| flights  | 3001  |
| bookings | 3002  |
| payments | 3003  |
| rabbitMQ | 15672 |

## main endpoints of this project

1. GET http://localhost:3001/flights (get flights)
2. GET http://localhost:3001/flights/2 (get flights by id)
3. GET http://localhost:3002/bookings (get bookings)
4. POST http://localhost:3002/bookings (create or register booking)
