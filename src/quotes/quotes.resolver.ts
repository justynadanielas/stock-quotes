import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { QuotesService } from './quotes.service';
import { Quote } from './entities/quote.entity';
import { CreateQuoteInput } from './dto/create-quote.input';
import { UpdateQuoteInput } from './dto/update-quote.input';
import { Instrument } from 'src/instruments/entities/instrument.entity';
import { InstrumentsService } from 'src/instruments/instruments.service';
import { forwardRef, Inject } from '@nestjs/common';
import { CreateQuoteInputWithTicker } from './dto/create-quote-with-ticker.input';
import { CreateInstrumentInput } from 'src/instruments/dto/create-instrument.input';

@Resolver(() => Quote)
export class QuotesResolver {
  constructor(
    @Inject(forwardRef(() => InstrumentsService)) private instrumentsService: InstrumentsService,
    private readonly quotesService: QuotesService) {}

  @Mutation(() => Quote)
  createQuote(@Args('createQuoteInput') createQuoteInput: CreateQuoteInput): Promise<Quote> {
    return this.quotesService.create(createQuoteInput);
  }

  @Mutation(() => Quote)
  async createQuoteWithTicker(@Args('createQuoteInputWithTicker') createQuoteWithTicker: CreateQuoteInputWithTicker): Promise<Quote> {
    let instrument = await this.instrumentsService.findOneByName(createQuoteWithTicker.intrumentTickerName);

    if(instrument){
      let instrument_id = instrument.id;
      let quote_input: CreateQuoteInput = {
        time_stamp: createQuoteWithTicker.time_stamp,
        price: createQuoteWithTicker.price,
        intrumentId: instrument_id
      }
      return this.quotesService.create(quote_input);
    } else {
      instrument = await this.instrumentsService.create({
        ticker_name: createQuoteWithTicker.intrumentTickerName,
      })
      let quote_input: CreateQuoteInput = {
        time_stamp: createQuoteWithTicker.time_stamp,
        price: createQuoteWithTicker.price,
        intrumentId: instrument.id
      }
      return this.quotesService.create(quote_input)
    }
  }

  @Query(() => [Quote], { name: 'quotes' })
  findAll(): Promise<Quote[]> {
    return this.quotesService.findAll();
  }

  @Query(() => Quote, { name: 'quote' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Quote> {
    return this.quotesService.findOne(id);
  }

  @ResolveField(returns => Instrument)
  instrument(@Parent() quote: Quote): Promise<Instrument> {
    return this.quotesService.getInstrument(quote.intrumentId);
  }

  // @Mutation(() => Quote)
  // updateQuote(@Args('updateQuoteInput') updateQuoteInput: UpdateQuoteInput) {
  //   return this.quotesService.update(updateQuoteInput.id, updateQuoteInput);
  // }

  // @Mutation(() => Quote)
  // removeQuote(@Args('id', { type: () => Int }) id: number) {
  //   return this.quotesService.remove(id);
  // }
}
