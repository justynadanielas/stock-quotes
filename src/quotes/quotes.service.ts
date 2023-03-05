import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuoteInput } from './dto/create-quote.input';
import { UpdateQuoteInput } from './dto/update-quote.input';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuotesService {
  constructor(@InjectRepository(Quote) private quotesRepository: Repository<Quote>) {}

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

  // async update(id: number, updateQuoteInput: UpdateQuoteInput) {
  //   return `This action updates a #${id} quote`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} quote`;
  // }
}
