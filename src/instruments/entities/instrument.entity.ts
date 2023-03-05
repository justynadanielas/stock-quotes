import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Quote } from 'src/quotes/entities/quote.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Instrument {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  ticker_name: string;

  // @Column()
  // @Field()
  // company_name: string;

  @OneToMany(() => Quote, quote => quote.instrument)
  @Field(type => [Quote], {nullable: true})
  quotes?: Quote[];
}
