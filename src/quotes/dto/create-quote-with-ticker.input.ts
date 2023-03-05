import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuoteInputWithTicker {

  @Field()
  time_stamp: string;

  @Field(type => Int)
  price: number;

  @Field()
  intrumentTickerName: string;
  
}