import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payment } from './payment.entity';
 
@Entity('payment_events')
export class PaymentEvent {
  @PrimaryGeneratedColumn('increment')
  id: number;
 
  @Column({ name: 'payment_id', type: 'int' })
  paymentId: number;
 
  @Column({ type: 'varchar', length: 80 })
  step: string;
 
  @Column({ type: 'varchar', length: 255 })
  message: string;
 
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
 
  @ManyToOne(() => Payment, (payment) => payment.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;
}
 