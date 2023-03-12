import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentsService } from '../instruments/instruments.service';
import { QuotesResolver } from './quotes.resolver';
import { QuotesService } from './quotes.service';

describe('QuotesResolver', () => {
  let resolver: QuotesResolver;

  const mockQuotesService = {

  }

  const mockInstrumentsService = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotesResolver, {
        provide: InstrumentsService,
        useValue: mockInstrumentsService,
      }, {
        provide: QuotesService,
        useValue: mockQuotesService,
      }],
    }).compile();

    resolver = module.get<QuotesResolver>(QuotesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
