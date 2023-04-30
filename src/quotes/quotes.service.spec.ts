import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentsService } from '../instruments/instruments.service';
import { Instrument } from '../instruments/entities/instrument.entity';
import { Quote } from './entities/quote.entity';
import { QuotesService } from './quotes.service';

describe('QuotesService', () => {
  let service: QuotesService;

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

  const mockQuotesRepository = {
    create: jest.fn(quoteInput => {
      return {
        id: 1,
        ...quoteInput
      }
    }),

    save: jest.fn(quote => {
      return Promise.resolve(quote);
    }),

    find: jest.fn(() => {
      return quotes;
    }),

    findOneByOrFail: jest.fn(({id: id}) => {
      return quotes.find((el) => el.id === id);
    }),
  }

  const mockInstrumentsService = {
    findOne: jest.fn((id) => {
      return instruments[id];
    }),

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

  it('should create a quote', async () => {
    expect(await service.create({time_stamp: new Date().toISOString(), price: 100, intrumentId: 1})).toEqual({
      id: expect.any(Number),
      time_stamp: expect.any(String),
      price: 100,
      intrumentId: 1
    })
  })

  it('should handle race condition when creating a quote with same instrument ticker name', async () => {
    const promises = [
      service.createQuoteWithTicker({time_stamp: new Date().toISOString(), price: 100, intrumentTickerName: 'CCCC'}),
      service.createQuoteWithTicker({time_stamp: new Date().toISOString(), price: 200, intrumentTickerName: 'CCCC'}),
      service.createQuoteWithTicker({time_stamp: new Date().toISOString(), price: 300, intrumentTickerName: 'CCCC'}),
      service.createQuoteWithTicker({time_stamp: new Date().toISOString(), price: 400, intrumentTickerName: 'CCCC'}),
      service.createQuoteWithTicker({time_stamp: new Date().toISOString(), price: 500, intrumentTickerName: 'CCCC'}),
    ];

    const results = await Promise.all(promises);

    expect(mockInstrumentsService.findOneByName).toHaveBeenCalledTimes(5);
    expect(mockInstrumentsService.create).toHaveBeenCalledTimes(1);


  })

  it('should return all quotes', async () => {
    const result = await service.findAll();
    expect(result.length).toEqual(2);
  })

  it('should return a quote by given id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(quotes[0]);
  })

  it('should return an instrument by given instrument id', async () => {
    const result = await service.getInstrument(1);
    expect(result).toEqual(instruments[1]);
  })

}); 
