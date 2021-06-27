const getPriceWithFormat = price => {
  let turkish = Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0
  });

  return turkish.format(price);
};

export default getPriceWithFormat;
