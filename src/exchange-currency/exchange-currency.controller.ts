import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExchangeCurrencyService } from './exchange-currency.service';
import { CreateExchangeCurrencyDto } from './dto/create-exchange-currency.dto';
import { UpdateExchangeCurrencyDto } from './dto/update-exchange-currency.dto';

@Controller('exchange-currency')
export class ExchangeCurrencyController {
  constructor(private readonly exchangeCurrencyService: ExchangeCurrencyService) {}

  @Post()
  create(@Body() createExchangeCurrencyDto: CreateExchangeCurrencyDto) {
    return this.exchangeCurrencyService.create(createExchangeCurrencyDto);
  }

  @Get()
  findAll() {
    return this.exchangeCurrencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeCurrencyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExchangeCurrencyDto: UpdateExchangeCurrencyDto) {
    return this.exchangeCurrencyService.update(+id, updateExchangeCurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exchangeCurrencyService.remove(+id);
  }
}
