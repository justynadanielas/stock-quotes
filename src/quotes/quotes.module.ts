import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesResolver } from './quotes.resolver';

@Module({
  providers: [QuotesResolver, QuotesService]
})
export class QuotesModule {}
