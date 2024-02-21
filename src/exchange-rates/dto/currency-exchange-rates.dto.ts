import { IsNotEmpty, IsString } from 'class-validator';

export class CurrencyExchangeRatesDto {
    @IsNotEmpty()
    @IsString()
    currency: string;
}
