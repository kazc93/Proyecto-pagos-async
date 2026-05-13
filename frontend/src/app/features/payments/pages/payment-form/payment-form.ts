import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { PaymentsService } from '../../../../core/services/payments.service';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentFormComponent {
  loading = false;
  error = '';

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly paymentsService: PaymentsService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(19)]],
      expirationDate: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      amount: [0, [Validators.required, Validators.min(1)]],
      customerName: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.cdr.detectChanges();

    this.paymentsService.createPayment(this.form.getRawValue()).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/payments', response.id]);
      },
      error: (err) => {
        console.error('Error al crear pago', err);
        this.error = 'No se pudo crear el pago.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
