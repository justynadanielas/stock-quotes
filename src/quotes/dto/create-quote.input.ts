import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuoteInput {

  @Field()
  time_stamp: string;

  @Field(type => Int)
  price: number;

  @Field(type => Int)
  intrumentId: number;
  
}
