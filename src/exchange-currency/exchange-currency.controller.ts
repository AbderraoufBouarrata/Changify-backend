import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ExchangeCurrencyService } from './exchange-currency.service';
import { ExchangeCurrencyDto } from './dto/exchange-currency.dto';

@Controller('exchange-currency')
export class ExchangeCurrencyController {
    constructor(
        private readonly exchangeCurrencyService: ExchangeCurrencyService,
    ) {}

    @Get()
    findOne(
        @Query('base') base: string,
        @Query('amount') amount: number,
        @Query('to') to: string,
    ) {
        return this.exchangeCurrencyService.convertCurrency({
            base: base,
            amount: amount,
            to: to,
        });
    }

    @Post()
    create(@Body() body: ExchangeCurrencyDto) {
        return this.exchangeCurrencyService.convertCurrency(body);
    }
}
