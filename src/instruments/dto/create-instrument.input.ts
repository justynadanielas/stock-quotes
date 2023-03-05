import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInstrumentInput {
  
  @Field()
  ticker_name: string;

  // @Field()
  // company_name: string;
}
