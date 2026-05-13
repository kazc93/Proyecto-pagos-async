import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PaymentsService } from '../../../../core/services/payments.service';
import { PollingService } from '../../../../core/services/polling.service';
import { Payment } from '../../../../models/payment.model';
import { PaymentEvent } from '../../../../models/payment-event.model';

@Component({
  selector: 'app-payment-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-detail.html',
  styleUrl: './payment-detail.scss',
})
export class PaymentDetailComponent implements OnInit {
  paymentId!: number;
  payment?: Payment;
  events: PaymentEvent[] = [];
  loading = false;
  error = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly paymentsService: PaymentsService,
    private readonly pollingService: PollingService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadInitialData();
    this.startPolling();
  }

  loadInitialData(): void {
    this.loading = true;
    this.error = '';

    this.paymentsService.getPaymentById(this.paymentId).subscribe({
      next: (data) => {
        this.payment = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener pago', err);
        this.error = 'No se pudo cargar el pago.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });

    this.loadEvents();
  }

  loadEvents(): void {
    this.paymentsService.getPaymentEvents(this.paymentId).subscribe({
      next: (data) => {
        this.events = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener eventos', err);
      },
    });
  }

  startPolling(): void {
    this.pollingService.watchPayment(this.paymentId).subscribe({
      next: (payment) => {
        this.payment = payment;
        this.loadEvents();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en polling', err);
      },
    });
  }

getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    PENDING: 'Pendiente',
    PROCESSING: 'Procesando',
    APPROVED: 'Aprobado',
    REJECTED: 'Rechazado',
    FAILED: 'Fallido',
    CANCELLED: 'Cancelado',
  };
  return statusMap[status] || status;
  }
}
