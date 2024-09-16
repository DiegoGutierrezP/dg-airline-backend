export interface AuthorizePaymentRequest {
    bookingId: string,
    cardNumber: string,
    amount: number
}