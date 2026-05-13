import { Routes } from '@angular/router';

import { PaymentListComponent } from './features/payments/pages/payment-list/payment-list';
import { PaymentFormComponent } from './features/payments/pages/payment-form/payment-form';
import { PaymentDetailComponent } from './features/payments/pages/payment-detail/payment-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'payments', pathMatch: 'full' },
  { path: 'payments', component: PaymentListComponent },
  { path: 'payments/new', component: PaymentFormComponent },
  { path: 'payments/:id', component: PaymentDetailComponent },
  { path: '**', redirectTo: 'payments' },
];
