import { CreateInstrumentInput } from './create-instrument.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInstrumentInput extends PartialType(CreateInstrumentInput) {
  @Field(() => Int)
  id: number;
}
