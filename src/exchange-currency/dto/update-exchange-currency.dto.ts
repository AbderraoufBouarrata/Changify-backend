import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangeCurrencyDto } from './create-exchange-currency.dto';

export class UpdateExchangeCurrencyDto extends PartialType(CreateExchangeCurrencyDto) {}
