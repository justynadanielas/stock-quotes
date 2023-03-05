import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstrumentInput } from './dto/create-instrument.input';
import { UpdateInstrumentInput } from './dto/update-instrument.input';
import { Instrument } from './entities/instrument.entity';

@Injectable()
export class InstrumentsService {
  constructor(@InjectRepository(Instrument) private instrumentsRepository: Repository<Instrument>) {}
  
  async create(createInstrumentInput: CreateInstrumentInput): Promise<Instrument> {
    const newInstrument = this.instrumentsRepository.create(createInstrumentInput);

    return this.instrumentsRepository.save(newInstrument);
  }

  async findAll(): Promise<Instrument[]> {
    return this.instrumentsRepository.find();
  }

  async findOne(id: number): Promise<Instrument> {
    return this.instrumentsRepository.findOneByOrFail({id: id});
  }

  async findOneByName(ticker_name: string): Promise<Instrument> {
    return this.instrumentsRepository.findOneBy({ticker_name: ticker_name});
  }

  // update(id: number, updateInstrumentInput: UpdateInstrumentInput) {
  //   return `This action updates a #${id} instrument`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} instrument`;
  // }
}
