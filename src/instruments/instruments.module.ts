import { Module } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';
import { InstrumentsResolver } from './instruments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from './entities/instrument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instrument])],
  providers: [InstrumentsResolver, InstrumentsService]
})
export class InstrumentsModule {}
