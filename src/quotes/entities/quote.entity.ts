import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Instrument } from '../../instruments/entities/instrument.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Quote {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  time_stamp: string;

  @Column()
  @Field(type => Int)
  price: number;

  @Column()
  @Field(type => Int)
  intrumentId: number;

  @ManyToOne(() => Instrument, instrument => instrument.quotes)
  @Field(type => Instrument)
  instrument: Instrument
}
