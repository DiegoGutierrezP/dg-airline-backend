import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from '../services/payments.service';
import { AuthorizePaymentRequest } from '../dtos';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @MessagePattern('authorize_payment')
  handleCheckSeatAvailability(@Payload() data: AuthorizePaymentRequest) {
    return this.paymentsService.authorizePayment(data);
  }
}
