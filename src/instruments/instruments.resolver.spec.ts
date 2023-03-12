import { Test, TestingModule } from '@nestjs/testing';
import { Instrument } from './entities/instrument.entity';
import { InstrumentsResolver } from './instruments.resolver';
import { InstrumentsService } from './instruments.service';

describe('InstrumentsResolver', () => {
  let resolver: InstrumentsResolver;

  const instruments: Instrument[] = [
    {
      id: 1,
      ticker_name: 'AAAA'
    }, {
      id: 2,
      ticker_name: 'BBBB'
    }
  ]

  const mockInstrumentsService = {
    create: jest.fn(instrumentInput => {
      return {
        id: 1,
        ...instrumentInput
      }
    }),

    findAll: jest.fn(() => {
      return instruments;
    }),

    findOne: jest.fn((id) => {
      return instruments[id];
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstrumentsResolver, InstrumentsService],
    }).overrideProvider(InstrumentsService).useValue(mockInstrumentsService).compile();

    resolver = module.get<InstrumentsResolver>(InstrumentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create an instrument', () => {
    expect(resolver.createInstrument({ticker_name: 'AAAA'})).toEqual({
      id: expect.any(Number),
      ticker_name: 'AAAA'
    })
  });

  it('should return all instruments', async () => {
    const result = await resolver.findAll();
    expect(result.length).toEqual(2);
  })

  it('should return an instrument by given id', async () => {
    const result = await resolver.findOne(1);
    expect(result).toEqual(instruments[1]);
  })

});
