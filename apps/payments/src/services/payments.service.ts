import { Injectable } from '@nestjs/common';
import { AuthorizePaymentRequest } from '../dtos';

@Injectable()
export class PaymentsService {
  getHello(): string {
    return 'Hello World!';
  }

  authorizePayment(request: AuthorizePaymentRequest) {
    console.log(request)

    if (request.cardNumber === '123123123') {
      return { authorize: false };
    }

    return { authorize: true };
  }
}
