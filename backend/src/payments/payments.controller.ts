import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
 
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
 
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
 
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }
 
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }
 
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.findOne(id);
  }
 
  @Get(':id/events')
  findEvents(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.findEventsByPaymentId(id);
  }
}