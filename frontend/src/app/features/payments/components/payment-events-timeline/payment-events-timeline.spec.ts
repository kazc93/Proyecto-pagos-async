import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEventsTimeline } from './payment-events-timeline';

describe('PaymentEventsTimeline', () => {
  let component: PaymentEventsTimeline;
  let fixture: ComponentFixture<PaymentEventsTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentEventsTimeline],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentEventsTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
