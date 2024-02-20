import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeCurrencyService } from './exchange-currency.service';

describe('ExchangeCurrencyService', () => {
    let service: ExchangeCurrencyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ExchangeCurrencyService],
        }).compile();

        service = module.get<ExchangeCurrencyService>(ExchangeCurrencyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
