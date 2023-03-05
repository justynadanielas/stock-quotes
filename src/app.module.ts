import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quotes/entities/quote.entity';
import { InstrumentsModule } from './instruments/instruments.module';
import { Instrument } from './instruments/entities/instrument.entity';


@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    driver: ApolloDriver,
  }), 
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'stock-quotes',
    entities: [Quote, Instrument],  
    synchronize: true,
  }),
  QuotesModule,
  InstrumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
