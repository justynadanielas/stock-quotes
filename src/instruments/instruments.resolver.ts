import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InstrumentsService } from './instruments.service';
import { Instrument } from './entities/instrument.entity';
import { CreateInstrumentInput } from './dto/create-instrument.input';
import { UpdateInstrumentInput } from './dto/update-instrument.input';

@Resolver(() => Instrument)
export class InstrumentsResolver {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Mutation(() => Instrument)
  createInstrument(@Args('createInstrumentInput') createInstrumentInput: CreateInstrumentInput): Promise<Instrument> {
    return this.instrumentsService.create(createInstrumentInput);
  }

  @Query(() => [Instrument], { name: 'instruments' })
  findAll(): Promise<Instrument[]> {
    return this.instrumentsService.findAll();
  }

  @Query(() => Instrument, { name: 'instrument' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Instrument> {
    return this.instrumentsService.findOne(id);
  }

  // @Mutation(() => Instrument)
  // updateInstrument(@Args('updateInstrumentInput') updateInstrumentInput: UpdateInstrumentInput) {
  //   return this.instrumentsService.update(updateInstrumentInput.id, updateInstrumentInput);
  // }

  // @Mutation(() => Instrument)
  // removeInstrument(@Args('id', { type: () => Int }) id: number) {
  //   return this.instrumentsService.remove(id);
  // }
}
