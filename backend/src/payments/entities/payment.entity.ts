import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentStatus } from '../../common/enums/payment-status.enum';
import { PaymentEvent } from './payment-event.entity';
 
@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('increment')
  id: number;
 
  @Column({ name: 'card_number', type: 'varchar', length: 25 })
  cardNumber: string;
 
  @Column({ name: 'expiration_date', type: 'varchar', length: 7 })
  expirationDate: string;
 
  @Column({ type: 'varchar', length: 4 })
  cvv: string;
 
  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount: number;
 
  @Column({ name: 'customer_name', type: 'varchar', length: 120 })
  customerName: string;
 
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;
 
  @Column({ name: 'risk_score', type: 'int', nullable: true })
  riskScore?: number;
 
  @Column({ name: 'rejection_reason', type: 'varchar', length: 255, nullable: true })
  rejectionReason?: string;
 
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
 
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
 
  @OneToMany(() => PaymentEvent, (paymentEvent) => paymentEvent.payment)
  events: PaymentEvent[];
}