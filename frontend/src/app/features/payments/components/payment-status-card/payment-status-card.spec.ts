import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusCard } from './payment-status-card';

describe('PaymentStatusCard', () => {
  let component: PaymentStatusCard;
  let fixture: ComponentFixture<PaymentStatusCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentStatusCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentStatusCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
