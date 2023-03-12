import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Instrument } from './entities/instrument.entity';
import { InstrumentsService } from './instruments.service';

describe('InstrumentsService', () => {
  let service: InstrumentsService;

  const mockInstrumentsRepository = {
    
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
});
