import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Payment } from '../../models/payment.model';
import { PaymentEvent } from '../../models/payment-event.model';

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  private readonly apiUrl = 'http://localhost:3000/payments';

  constructor(private readonly http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  getPaymentEvents(id: number): Observable<PaymentEvent[]> {
    return this.http.get<PaymentEvent[]>(`${this.apiUrl}/${id}/events`);
  }

  createPayment(data: Omit<Payment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, data);
  }
}
