import { Injectable } from '@nestjs/common';
import { AuthorizePaymentRequest } from '../dtos';

@Injectable()
export class PaymentsService {
  getHello(): string {
    return 'Hello World!';
  }

  authorizePayment(request: AuthorizePaymentRequest) {
    console.log(request)
    return { authorize: true };
  }
}
