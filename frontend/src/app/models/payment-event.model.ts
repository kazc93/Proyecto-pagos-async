export interface PaymentEvent {
  id: number;
  paymentId: number;
  step: string;
  message: string;
  createdAt: string;
}
