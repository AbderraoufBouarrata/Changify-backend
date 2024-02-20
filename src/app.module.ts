import { Module } from '@nestjs/common';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { ExchangeCurrencyModule } from './exchange-currency/exchange-currency.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ExchangeRatesModule,
        ExchangeCurrencyModule,
        ScheduleModule.forRoot(),
        PrismaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
