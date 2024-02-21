import { currencies } from 'src/assets/currencies';

const allCurrencyCodes = currencies.map((currency) => currency.CurrencyCode);

export function isValidCurrency(currency) {
    if (allCurrencyCodes.includes(currency)) return true;
    else return false;
}
