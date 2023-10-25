class currency {
  formatCurrency = (currency, decimalPlaces = 2) =>
    Number(currency)?.toLocaleString("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }) || "";
}

const currencyService = new currency();
export default currencyService;
