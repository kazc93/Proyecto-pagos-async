import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 
import { PaymentProcessor } from './payment.processor';
import { Payment } from '../payments/entities/payment.entity';
import { PaymentEvent } from '../payments/entities/payment-event.entity';
 
@Module({
  imports: [TypeOrmModule.forFeature([Payment, PaymentEvent])],
  providers: [PaymentProcessor],
})
export class WorkerModule {}
 