import { Injectable, Logger } from '@nestjs/common';
import { ExchangeCurrencyDto } from './dto/exchange-currency.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { isValidCurrency } from 'src/utils/isValidCurrency';

@Injectable()
export class ExchangeCurrencyService {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService,
    ) {}
    private readonly logger = new Logger(ExchangeCurrencyService.name);
    private maxDailyRequestNumber: number;

    @Cron('0 0 * * *', {
        name: 'resetDailyRequestNumber',
        timeZone: 'Europe/Paris',
    }) // Cron will make it reset everyday at midnight GMT+1
    reset() {
        this.maxDailyRequestNumber = 0;
    }

    async convertCurrency(props: ExchangeCurrencyDto) {
        const { base, amount, to } = props;

        //FIRST: We need to make sure we dealing with a valid currency
        if (!(isValidCurrency(base) && isValidCurrency(to))) {
            this.logger.error('invalid currency code');
            return {
                status: 'error',
                message: 'invalid currency code entered',
            };
        }

        let convertedCurrency;

        try {
            // SECOND: We look for the exchange rate in the database
            const result = await this.prisma.exchangeRate.findMany({
                where: {
                    fromCurrency: base,
                    toCurrency: to,
                },
                select: {
                    fromCurrency: true,
                    toCurrency: true,
                    rate: true,
                },
            });

            if (result.length > 0) {
                // THIRD: if found we do the calculation and return it
                convertedCurrency = amount * result[0].rate;
                return {
                    base: base,
                    amount: amount,
                    to: to,
                    convertedValue: convertedCurrency,
                };
            } else {
                this.logger.log(
                    'value not found, fetching it and adding it to database',
                );
                // FOURTH: if not found we need to fetch it, if we can :(
                if (this.maxDailyRequestNumber >= 46) {
                    this.logger.error('Daily limit reached ⛔⛔');
                    return {
                        status: 'error',
                        message:
                            'Daily limit reached, please try again tomoorow',
                    };
                }
                const result = await fetch(
                    `${this.config.get<string>('API_URL')}/latest/${base}`,
                );
                this.maxDailyRequestNumber++;

                const data = await result.json();

                // FIFTH: we save it in the database so that we wouldn't need to fetch it again in the same 24 hours cause it wouldn't have updated anyway
                for (const [key, value] of Object.entries(
                    data.conversion_rates,
                )) {
                    const created = await this.prisma.exchangeRate.create({
                        data: {
                            fromCurrency: base,
                            toCurrency: key,
                            rate: value as number,
                        },
                    });
                    this.logger.debug(`${created} created successfully.`);
                }

                // SIXTH: Get the value we need from the newly saved rows, do the math and return the res
                const row = await this.prisma.exchangeRate.findMany({
                    where: {
                        fromCurrency: base,
                        toCurrency: to,
                    },
                    select: {
                        fromCurrency: true,
                        toCurrency: true,
                        rate: true,
                    },
                });

                convertedCurrency = amount * row[0].rate;
                return {
                    base: base,
                    amount: amount,
                    to: to,
                    convertedValue: convertedCurrency,
                };
            }
        } catch (error) {
            this.logger.error('operation to convert currency failed:', error);
            return {
                status: 'error',
                message: 'Failed to convert currency',
            };
        }
    }
}
