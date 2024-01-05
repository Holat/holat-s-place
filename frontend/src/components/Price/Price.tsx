const Price = ({
  locale,
  price,
  currency,
}: {
  locale?: string;
  price: number;
  currency?: string;
}) => {
  const formatPrice = () =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(price);

  return <span>{formatPrice()}</span>;
};

Price.defaultProps = {
  locale: "en-NG",
  currency: "NGN",
};

export default Price;

/**
 * const formatCurrency = (amount, currency) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  const formattedAmount = formatter.format(amount);

  // Replace the default currency symbol with a custom one
  const customSymbol = '₦'; // Nigerian Naira symbol
  return formattedAmount.replace(formatter.formatToParts(1).find(part => part.type === 'currency').value, customSymbol);
};

const amount = 1000;
const currency = 'USD';

const result = formatCurrency(amount, currency);
console.log(result);
 */
