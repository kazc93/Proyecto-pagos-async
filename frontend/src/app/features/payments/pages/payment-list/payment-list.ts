import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PaymentsService } from '../../../../core/services/payments.service';
import { Payment } from '../../../../models/payment.model';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.scss',
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  loading = false;
  error = '';

  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    this.error = '';

    this.paymentsService.getPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar pagos', err);
        this.error = 'No se pudieron cargar los pagos.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
