import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quotes/entities/quote.entity';


@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    driver: ApolloDriver,
  }), 
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [Quote],  
    synchronize: true,
  }),
  QuotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
