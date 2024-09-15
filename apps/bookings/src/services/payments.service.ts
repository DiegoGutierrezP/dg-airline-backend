import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AuthorizePaymentRequest, AuthorizePaymentResponse } from '../dtos';

@Injectable()
export class PaymentsService {

    constructor(
        @Inject('PAYMENTS_SERVICE') private readonly client: ClientProxy,
    ) { }


    async authorizePayment(request: AuthorizePaymentRequest) {
        const response = await lastValueFrom(
            this.client.send<AuthorizePaymentResponse>('authorize_payment', request)
        )

        return response.authorize
    }
}
