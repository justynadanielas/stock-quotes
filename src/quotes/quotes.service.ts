import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instrument } from 'src/instruments/entities/instrument.entity';
import { InstrumentsService } from '../instruments/instruments.service';
import { Repository } from 'typeorm';
import { CreateQuoteInput } from './dto/create-quote.input';
import { UpdateQuoteInput } from './dto/update-quote.input';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuotesService {
  constructor(@InjectRepository(Quote) private quotesRepository: Repository<Quote>, 
    private instrumentService: InstrumentsService) {}

  async create(createQuoteInput: CreateQuoteInput): Promise<Quote> {
    const newQuote = this.quotesRepository.create(createQuoteInput);

    return this.quotesRepository.save(newQuote);
  }

  async findAll(): Promise<Quote[]>{
    return this.quotesRepository.find();
  }

  async findOne(id: number): Promise<Quote> {
    return this.quotesRepository.findOneByOrFail({id: id});
  }

  async getInstrument(instrumentId: number): Promise<Instrument> {
    return this.instrumentService.findOne(instrumentId);
  }

  // async update(id: number, updateQuoteInput: UpdateQuoteInput) {
  //   return `This action updates a #${id} quote`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} quote`;
  // }
}
