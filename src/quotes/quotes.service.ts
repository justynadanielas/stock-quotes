import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instrument } from 'src/instruments/entities/instrument.entity';
import { InstrumentsService } from '../instruments/instruments.service';
import { Repository } from 'typeorm';
import { CreateQuoteInput } from './dto/create-quote.input';
import { UpdateQuoteInput } from './dto/update-quote.input';
import { Quote } from './entities/quote.entity';
import { CreateQuoteInputWithTicker } from './dto/create-quote-with-ticker.input';

@Injectable()
export class QuotesService {
  constructor(@InjectRepository(Quote) private quotesRepository: Repository<Quote>, 
    private instrumentsService: InstrumentsService) {}

  async create(createQuoteInput: CreateQuoteInput): Promise<Quote> {
    const newQuote = this.quotesRepository.create(createQuoteInput);

    return this.quotesRepository.save(newQuote);
  }

  async createQuoteWithTicker(createQuoteWithTicker: CreateQuoteInputWithTicker): Promise<Quote> {
    let instrument = await this.instrumentsService.findOneByName(createQuoteWithTicker.intrumentTickerName);

    if(instrument){
      let instrument_id = instrument.id;
      let quote_input: CreateQuoteInput = {
        time_stamp: createQuoteWithTicker.time_stamp,
        price: createQuoteWithTicker.price,
        intrumentId: instrument_id
      }
      return this.create(quote_input);
    } else {
      instrument = await this.instrumentsService.create({
        ticker_name: createQuoteWithTicker.intrumentTickerName,
      })
      let quote_input: CreateQuoteInput = {
        time_stamp: createQuoteWithTicker.time_stamp,
        price: createQuoteWithTicker.price,
        intrumentId: instrument.id
      }
      return this.create(quote_input)
    }
  }

  async findAll(): Promise<Quote[]>{
    return this.quotesRepository.find();
  }

  async findOne(id: number): Promise<Quote> {
    return this.quotesRepository.findOneByOrFail({id: id});
  }

  async getInstrument(instrumentId: number): Promise<Instrument> {
    return this.instrumentsService.findOne(instrumentId);
  }

  // async update(id: number, updateQuoteInput: UpdateQuoteInput) {
  //   return `This action updates a #${id} quote`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} quote`;
  // }
}
