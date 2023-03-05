import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Instrument {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  ticker_name: string;

  @Column()
  @Field()
  company_name: string;
}
