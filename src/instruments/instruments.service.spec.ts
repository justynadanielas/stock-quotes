import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Instrument } from './entities/instrument.entity';
import { InstrumentsService } from './instruments.service';

describe('InstrumentsService', () => {
  let service: InstrumentsService;

  const instruments: Instrument[] = [
    {
      id: 1,
      ticker_name: 'AAAA'
    }, {
      id: 2,
      ticker_name: 'BBBB'
    }
  ]

  const mockInstrumentsRepository = {
    create: jest.fn(instrumentInput => {
      return {
        id: 1,
        ...instrumentInput
      }
    }),

    save: jest.fn(instrument => {
      return Promise.resolve(instrument);
    }),

    find: jest.fn(() => {
      return instruments;
    }),

    findOneByOrFail: jest.fn(({id: id}) => {
      return instruments.find((el) => el.id === id);
    }),

    findOneBy: jest.fn(ticker_name_obj => {
      const result = instruments.find(el => el.ticker_name === ticker_name_obj.ticker_name);
      return result;
    }),

    // findOneByAlt: jest.fn(({ticker_name}) => {
    //   const result = instruments.find(el => el.ticker_name === ticker_name);
    //   return result;
    // })

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstrumentsService, {
        provide: getRepositoryToken(Instrument),
        useValue: mockInstrumentsRepository,
      }],
    }).compile();

    service = module.get<InstrumentsService>(InstrumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an instrument', async () => {
    expect(await service.create({ticker_name: 'AAAA'})).toEqual({
      id: expect.any(Number),
      ticker_name: 'AAAA'
    })
  })

  it('should return all instruments', async () => {
    const result = await service.findAll();
    expect(result.length).toEqual(2);
  })

  it('should return an instrument by given id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(instruments[0]);
  })

  it('should return an instrument by given name', async () => {
    const result = await service.findOneByName('AAAA');
    expect(result).toEqual(instruments[0]);
  })

});
