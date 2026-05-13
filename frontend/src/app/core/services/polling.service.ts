import { Injectable } from '@angular/core';
import { Observable, interval, switchMap } from 'rxjs';

import { PaymentsService } from './payments.service';
import { Payment } from '../../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PollingService {
  constructor(private readonly paymentsService: PaymentsService) {}

  watchPayment(id: number): Observable<Payment> {
    return interval(3000).pipe(
      switchMap(() => this.paymentsService.getPaymentById(id)),
    );
  }
}
