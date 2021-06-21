const parseDate = str => {
  const mdy = str?.split('-');
  if(!mdy?.length) return 0
  return new Date(mdy[0], mdy[1] - 1, mdy[2]);
};

const datediff = (first, second) => {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
};

const imageRadio = ({
  data = [],
  title = '',
  selectedValue = '',
  formData,
  onSelect = () => {},
  validation = false
}) => {
  const roomFooter = price => {
    const day = datediff(parseDate(formData?.start_date), parseDate(formData?.end_date));
    const total_price = price * day * +formData?.adult;
    let turkish = Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0
    });

    const priceText = turkish.format(total_price);
    return (
      <div className='itemFooter'>
        <div>
          <div className='itemFooterText'>{`${day} Gün`}</div>
          <div className='itemFooterText'>{`${formData?.adult} Yetişkin`}</div>
        </div>
        <div className='itemPrice'>{`${priceText}`}</div>
      </div>
    );
  };

  const viewFooter = price_rate => {
    return (
      <div className='itemFooter center'>
        <div>
          <div className='itemFooterText'>Fiyat Etki Oranı</div>
        </div>
        <div className='itemPrice'>{`+ ${price_rate}%`}</div>
      </div>
    );
  };

  return (
    <div className='imageRadioContainer'>
      <div className='title'>{title}</div>
      <div className='imageRadioContent'>
        {data?.map(({ photo, title, price, price_rate, id }, index) => {
          return (
            <div
              onClick={() => onSelect(id)}
              key={title + id + index}
              className={`item ${+selectedValue === +id ? 'active' : ''}`}
            >
              <div className='itemTitle'>{title}</div>
              <img className='itemImage' src={photo} />
              {!!price && roomFooter(price)}
              {!!price_rate && viewFooter(price_rate)}
            </div>
          );
        })}
      </div>
      {!!validation && <div className='validation'>Zorunlu Alan</div>}
    </div>
  );
};

export default imageRadio;
