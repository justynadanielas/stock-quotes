import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { QuotesService } from './quotes.service';
import { Quote } from './entities/quote.entity';
import { CreateQuoteInput } from './dto/create-quote.input';
import { UpdateQuoteInput } from './dto/update-quote.input';
import { Instrument } from 'src/instruments/entities/instrument.entity';

@Resolver(() => Quote)
export class QuotesResolver {
  constructor(private readonly quotesService: QuotesService) {}

  @Mutation(() => Quote)
  createQuote(@Args('createQuoteInput') createQuoteInput: CreateQuoteInput): Promise<Quote> {
    return this.quotesService.create(createQuoteInput);
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
