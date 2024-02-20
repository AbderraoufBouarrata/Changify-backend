import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeCurrencyController } from './exchange-currency.controller';
import { ExchangeCurrencyService } from './exchange-currency.service';

describe('ExchangeCurrencyController', () => {
  let controller: ExchangeCurrencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeCurrencyController],
      providers: [ExchangeCurrencyService],
    }).compile();

    controller = module.get<ExchangeCurrencyController>(ExchangeCurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
