import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import { CurrencyExchangeRatesDto } from './dto/currency-exchange-rates.dto';

@Controller('exchange-rates')
export class ExchangeRatesController {
    constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

    @Get('test')
    test() {
        return this.exchangeRatesService.handleUpdateExchangeRates();
    }

    @Get(':currency')
    findRatesForCurrencyFromParam(@Param('currency') currency: string) {
        return this.exchangeRatesService.getRatesForCurrency(currency);
    }

    @Post()
    findRatesForCurrencyFromBody(@Body() body: CurrencyExchangeRatesDto) {
        return this.exchangeRatesService.getRatesForCurrency(body.currency);
    }
}
