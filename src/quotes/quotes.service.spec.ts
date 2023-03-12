import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentsService } from '../instruments/instruments.service';
import { Instrument } from '../instruments/entities/instrument.entity';
import { Quote } from './entities/quote.entity';
import { QuotesService } from './quotes.service';

describe('QuotesService', () => {
  let service: QuotesService;

  const mockQuotesRepository = {

  }

  const mockInstrumentsService = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotesService, {
        provide: getRepositoryToken(Quote),
        useValue: mockQuotesRepository,
      }, {
        provide: InstrumentsService,
        useValue: mockInstrumentsService,
      }],
    }).compile();

    service = module.get<QuotesService>(QuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
}); 
