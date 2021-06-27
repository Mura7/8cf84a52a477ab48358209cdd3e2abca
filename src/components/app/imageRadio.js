import Image from 'next/image';
import getDay from '../../../utils/getDay';
import getPriceWithFormat from '../../../utils/getPriceWithFormat';

const imageRadio = ({
  data = [],
  title = '',
  selectedValue = '',
  formData,
  onSelect = () => {},
  validation = false
}) => {
  const roomFooter = price => {
    const day = getDay(formData?.start_date, formData?.end_date);
    const total_price = price * day * +formData?.adult;

    const priceText = getPriceWithFormat(total_price);
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
              <div className='itemImage'>
                <Image src={photo} layout="fill" className='image'/>
              </div>
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
