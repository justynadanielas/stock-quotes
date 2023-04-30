import { Test, TestingModule } from '@nestjs/testing';
import { Instrument } from '../instruments/entities/instrument.entity';
import { InstrumentsService } from '../instruments/instruments.service';
import { Quote } from './entities/quote.entity';
import { QuotesResolver } from './quotes.resolver';
import { QuotesService } from './quotes.service';
import { CreateQuoteInput } from './dto/create-quote.input';
import { CreateQuoteInputWithTicker } from './dto/create-quote-with-ticker.input';

describe('QuotesResolver', () => {
  let resolver: QuotesResolver;

  const instruments: Instrument[] = [
    {
      id: 1,
      ticker_name: 'AAAA'
    }, {
      id: 2,
      ticker_name: 'BBBB'
    }
  ]

  const quotes: Quote[] = [
    {
      id: 1,
      time_stamp: new Date().toISOString(),
      price: 100,
      intrumentId: 1,
      instrument: {
        id: 1,
        ticker_name: 'AAAA'
      }
    }, {
      id: 2,
      time_stamp: new Date().toISOString(),
      price: 100,
      intrumentId: 2,
      instrument: {
        id: 2,
        ticker_name: 'BBBB'
      }
    }
  ]

  const mockQuotesService = {
    create: jest.fn((quoteInput: CreateQuoteInput) => {
      return Promise.resolve({
        id: 1,
        ...quoteInput
      })
    }),

    createQuoteWithTicker: jest.fn((quoteWithTickerInput: CreateQuoteInputWithTicker) => {
      return Promise.resolve({
        id: 1,
        time_stamp: quoteWithTickerInput.time_stamp,
        price: quoteWithTickerInput.price,
        intrumentId: 1
      })
    }),

    findAll: jest.fn(() => {
      return quotes;
    }),

    findOne: jest.fn((id) => {
      return quotes[id];
    })
  }

  const mockInstrumentsService = {
    findOneByName: jest.fn(ticker_name => {
      const result = instruments.find(el => el.ticker_name === ticker_name);
      return Promise.resolve(result);
    }),

    create: jest.fn(instrumentInput => {
      return Promise.resolve({
        id: 1,
        ...instrumentInput
      })
    }),
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

  it('should create a quote', async () => {
    expect(await resolver.createQuote({time_stamp: new Date().toISOString(), price: 100, intrumentId: 1})).toEqual({
      id: expect.any(Number),
      time_stamp: expect.any(String),
      price: 100,
      intrumentId: 1
    })
  });

  it('should create a quote with given ticker', async () => {
    expect(await resolver.createQuoteWithTicker({time_stamp: new Date().toISOString(), price: 100, intrumentTickerName: 'AAAA'})).toEqual({
      id: expect.any(Number),
      time_stamp: expect.any(String),
      price: 100,
      intrumentId: instruments.find(el => el.ticker_name == 'AAAA').id
    })
  });

  it('should return all quotes', async () => {
    const result = await resolver.findAll();
    expect(result.length).toEqual(2);
  })

  it('should return a quote by given id', async () => {
    const result = await resolver.findOne(1);
    expect(result).toEqual(quotes[1]);
  })

});
