import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesResolver } from './quotes.resolver';
import { Quote } from './entities/quote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentsModule } from 'src/instruments/instruments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quote]), InstrumentsModule],
  providers: [QuotesResolver, QuotesService]
})
export class QuotesModule {}
