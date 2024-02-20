import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';

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
    findRatesForCurrencyFromBody(@Body() currency: string) {
        return this.exchangeRatesService.getRatesForCurrency(currency);
    }

    // @Post()
    // create(@Body() createExchangeRateDto: CreateExchangeRateDto) {
    //     return this.exchangeRatesService.create(createExchangeRateDto);
    // }

    // @Get()
    // findAll() {
    //     return this.exchangeRatesService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.exchangeRatesService.findOne(+id);
    // }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateExchangeRateDto: UpdateExchangeRateDto,
    // ) {
    //     return this.exchangeRatesService.update(+id, updateExchangeRateDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.exchangeRatesService.remove(+id);
    // }
}
