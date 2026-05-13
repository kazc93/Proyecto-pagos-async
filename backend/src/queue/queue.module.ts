import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
 
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payments',
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}