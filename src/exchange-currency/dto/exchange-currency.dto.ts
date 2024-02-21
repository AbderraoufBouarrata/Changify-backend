import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ExchangeCurrencyDto {
    @IsString()
    @IsNotEmpty()
    base: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    to: string;
}
