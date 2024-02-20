import { Injectable, Logger } from '@nestjs/common';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { importantCurrencies } from 'src/assets/importantCurrencies';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExchangeRatesService {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService,
    ) {}
    private readonly logger = new Logger(ExchangeRatesService.name);

    @Cron('0 0 * * *', {
        name: 'updateExchangeRates',
        timeZone: 'Europe/Paris',
    }) // Cron will make it update everyday at midnight GMT+1
    async handleUpdateExchangeRates() {
        this.logger.log('🤖 Updating exchange rates right now beep boop 🤖');
        // FIRST: we get all current data
        let allRows;
        try {
            allRows = await this.prisma.exchangeRate.findMany({});
        } catch (error) {
            this.logger.error('Error getting all rows:', error);
        }
        // SECOND: we loop through the currencies we want to auto update daily
        try {
            importantCurrencies.forEach(async (currency) => {
                // THIRD: we fetch the rates for that currency
                const result = await fetch(
                    `${this.config.get<string>('API_URL')}/latest/${currency}`,
                );
                const data = await result.json();
                // FOURTH: we save the result to the DATABASE
                for (const [key, value] of Object.entries(
                    data.conversion_rates,
                )) {
                    try {
                        const created = await this.prisma.exchangeRate.create({
                            data: {
                                fromCurrency: currency,
                                toCurrency: key,
                                rate: value as number,
                            },
                        });
                        this.logger.debug(`${created} created successfully.`);
                    } catch (error) {
                        console.error('Error creating row:', error);
                    } finally {
                        await this.prisma.$disconnect();
                    }
                }
            });

            // FIFTH: we delete the old data
            const deletedRows = await this.prisma.exchangeRate.deleteMany({
                where: {
                    id: {
                        in: allRows.map((row) => row.id), // Assuming 'id' is the primary key
                    },
                },
            });
            console.log(`${deletedRows.count} rows deleted successfully.`);
        } catch (error) {
            this.logger.error('Error during updating rows:', error);
        } finally {
            await this.prisma.$disconnect();
        }
    }

    getRatesForCurrency(currency: string) {
        return this.prisma.exchangeRate.findMany({
            where: {
                fromCurrency: currency,
            },
        });
    }

    create(CreateExchangeRateDto: CreateExchangeRateDto) {
        return 'This action adds a new exchangeRate';
    }

    findAll() {
        return `This action returns all exchangeRates`;
    }

    findOne(id: number) {
        return `This action returns a #${id} exchangeRate`;
    }

    update(id: number, updateExchangeRateDto: UpdateExchangeRateDto) {
        return `This action updates a #${id} exchangeRate`;
    }

    remove(id: number) {
        return `This action removes a #${id} exchangeRate`;
    }
}
