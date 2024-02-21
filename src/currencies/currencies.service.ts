import { Injectable, Logger } from '@nestjs/common';
import { currencies } from '../assets/currencies';

@Injectable()
export class CurrenciesService {
    private readonly logger = new Logger(CurrenciesService.name);

    getAllCurrencies() {
        try {
            return currencies;
        } catch (error) {
            this.logger.error('Error getting all currencies:', error);
            return {
                status: 'error',
                message: 'Failed to get all currencies',
            };
        }
    }
}
