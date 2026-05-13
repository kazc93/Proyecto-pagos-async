import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
 
import { Payment } from '../payments/entities/payment.entity';
import { PaymentEvent } from '../payments/entities/payment-event.entity';
import { PaymentStatus } from '../common/enums/payment-status.enum';
 
@Processor('payments')
export class PaymentProcessor extends WorkerHost {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
 
    @InjectRepository(PaymentEvent)
    private readonly paymentEventRepository: Repository<PaymentEvent>,
  ) {
    super();
  }
 
  async process(job: Job<{ paymentId: number }>): Promise<void> {
    const { paymentId } = job.data;
 
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });
 
    if (!payment) {
      throw new Error(`Pago con id ${paymentId} no encontrado`);
    }
 
    payment.status = PaymentStatus.PROCESSING;
    await this.paymentRepository.save(payment);
 
    await this.paymentEventRepository.save(
      this.paymentEventRepository.create({
        paymentId,
        step: 'PROCESO_INICIADO',
        message: 'Inicio del procesamiento del pago',
      }),
    );
 
    await this.delay(15000);
 
    const riskScore = this.calculateRisk(payment.amount);
 
    await this.paymentEventRepository.save(
      this.paymentEventRepository.create({
        paymentId,
        step: 'CALCULANDO_RIESGO',
        message: `Riesgo calculado: ${riskScore}`,
      }),
    );
 
    await this.delay(5000);
 
    if (riskScore > 70) {
      payment.status = PaymentStatus.REJECTED;
      payment.riskScore = riskScore;
      payment.rejectionReason = 'Pago rechazado por riesgo elevado';
 
      await this.paymentRepository.save(payment);
 
      await this.paymentEventRepository.save(
        this.paymentEventRepository.create({
          paymentId,
          step: 'ESTADO_FINAL',
          message: 'Pago rechazado',
        }),
      );
 
      return;
    }
 
    payment.status = PaymentStatus.APPROVED;
    payment.riskScore = riskScore;
 
    await this.paymentRepository.save(payment);
 
    await this.paymentEventRepository.save(
      this.paymentEventRepository.create({
        paymentId,
        step: 'ESTADO_FINAL',
        message: 'Pago aprobado',
      }),
    );
  }
 
  private calculateRisk(amount: number): number {
    if (amount >= 5000) return 85;
    if (amount >= 2000) return 60;
    return 25;
  }
 
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}