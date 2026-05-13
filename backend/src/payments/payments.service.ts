import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
 
import { Payment } from './entities/payment.entity';
import { PaymentEvent } from './entities/payment-event.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatus } from '../common/enums/payment-status.enum';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
 
@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
 
    @InjectRepository(PaymentEvent)
    private readonly paymentEventRepository: Repository<PaymentEvent>,
 
    @InjectQueue('payments')
    private readonly paymentsQueue: Queue,
  ) {}
 
  async create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      status: PaymentStatus.PENDING,
    });
 
    const savedPayment = await this.paymentRepository.save(payment);
 
    const paymentEvent = this.paymentEventRepository.create({
      paymentId: savedPayment.id,
      step: 'CREADO',
      message: 'Pago creado con estado Pendiente',
    });
 
    await this.paymentEventRepository.save(paymentEvent);
 
    await this.paymentsQueue.add('process-payment', {
      paymentId: savedPayment.id,
    });
 
    return {
      id: savedPayment.id,
      status: savedPayment.status,
    };
  }
 
  async findAll() {
    return this.paymentRepository.find({
      order: { id: 'DESC' },
    });
  }
 
  async findOne(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
    });
 
    if (!payment) {
      throw new NotFoundException(`No se encontró el pago con id ${id}`);
    }
 
    return payment;
  }
 
  async findEventsByPaymentId(paymentId: number) {
    await this.findOne(paymentId);
 
    return this.paymentEventRepository.find({
      where: { paymentId },
      order: { id: 'ASC' },
    });
  }
}