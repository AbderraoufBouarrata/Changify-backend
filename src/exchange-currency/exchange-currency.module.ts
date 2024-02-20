import { Module } from '@nestjs/common';
import { ExchangeCurrencyService } from './exchange-currency.service';
import { ExchangeCurrencyController } from './exchange-currency.controller';

@Module({
  controllers: [ExchangeCurrencyController],
  providers: [ExchangeCurrencyService],
})
export class ExchangeCurrencyModule {}
