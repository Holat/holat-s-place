const Price = ({
  locale = "en-NG",
  price,
  currency = "NGN",
  showP,
}: {
  locale?: string;
  price: number;
  currency?: string;
  showP?: boolean;
}) => {
  const formatPrice = () =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(price);

  return showP ? <span>({formatPrice()})</span> : <span>{formatPrice()}</span>;
};

export default Price;
