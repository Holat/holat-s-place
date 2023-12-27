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
  locale: "en-US",
  currency: "USD",
};

export default Price;
