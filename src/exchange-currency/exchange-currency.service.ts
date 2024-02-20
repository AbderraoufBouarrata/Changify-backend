import { Injectable } from '@nestjs/common';
import { CreateExchangeCurrencyDto } from './dto/create-exchange-currency.dto';
import { UpdateExchangeCurrencyDto } from './dto/update-exchange-currency.dto';

@Injectable()
export class ExchangeCurrencyService {
    create(CreateExchangeCurrencyDto: CreateExchangeCurrencyDto) {
        return 'This action adds a new exchangeRate';
    }

    findAll() {
        return `This action returns all exchangeCurrency`;
    }

    findOne(id: number) {
        return `This action returns a #${id} exchangeCurrency`;
    }

    update(id: number, updateExchangeCurrencyDto: UpdateExchangeCurrencyDto) {
        return `This action updates a #${id} exchangeCurrency`;
    }

    remove(id: number) {
        return `This action removes a #${id} exchangeCurrency`;
    }
}
