import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import getDay from '../../../utils/getDay';
import getPriceWithFormat from '../../../utils/getPriceWithFormat';
import Coupon from '../app/coupon';

const Summary = props => {
  const detail = useSelector(state => state?.data?.detail);
  const form = useSelector(state => state?.data?.form);

  const [data, setData] = useState({});

  useEffect(() => {
    applyData();
  }, []);

  useEffect(() => {
    const price = getTotalPrice();
    props?.setFormData({ price });
  }, [data]);

  const applyData = () => {
    const room_scenic = getRoomTypeOrScenic(form?.room_scenic, 'room_scenic');
    const room_type = getRoomTypeOrScenic(form?.room_type);
    setData({ room_scenic, room_type });
  };

  const renderBadge = (label = '', text = '') => {
    return (
      <div className='summaryBadge'>
        <div className='summaryBadgeLabel'>{`${label}:`}</div>
        <div className='summaryBadgeText'>{text}</div>
      </div>
    );
  };

  const getRoomTypeOrScenic = (id, type = 'room_type') => {
    const data = detail[type].filter(item => +item.id === +id);
    return data[0];
  };

  const renderVisitDay = () => {
    const day = getDay(form?.start_date, form?.end_date);
    return `(${day} Gün)`;
  };

  const getRoomPrice = () => {
    return data?.room_type?.price * form?.adult;
  };

  const getPrice = () => {
    const day = getDay(form?.start_date, form?.end_date);
    return getRoomPrice() * day;
  };

  const getTotalPrice = () => {
    const price = getPrice();
    const rate = data?.room_scenic?.price_rate;
    const incrasePrice = (price * rate) / 100;
    const discount_amount = !!form?.discount_amount ? form?.discount_amount : 0;

    return price + incrasePrice - discount_amount;
  };

  return (
    <div>
      <div className='summaryContainer'>
        <div className='hotelName'>
          {detail?.hotel_name}
          <span className='city'>({detail?.city})</span>
        </div>
        <div className='summaryBadgeContainer'>
          {renderBadge('Giriş Tarihi', form?.start_date)}
          {renderBadge('Çıkış Tarihi', form?.end_date)}
          {renderBadge('Yetişkin', form?.adult)}
          {renderBadge('Çoçuk', form?.child || 0)}
          {renderBadge('Oda Tipi', data?.room_type?.title)}
          {renderBadge('Manzara', data?.room_scenic?.title)}
        </div>
        {!!props.show_coupon && <Coupon {...props} />}
        <div className='priceContainer'>
          <div className='priceItem'>
            <div className='priceLabel'>
              Oda Fiyatı <span>{`(${form?.adult} Yetişkin)`}</span>
            </div>
            <div className='priceText'>{getPriceWithFormat(getRoomPrice())}</div>
          </div>
          <div className='priceItem'>
            <div className='priceLabel'>Fiyat Etki Oranı</div>
            <div className='priceText'>{data?.room_scenic?.price_rate}</div>
          </div>
          <div className='priceItem'>
            <div className='priceLabel'>
              Konaklama <span>{renderVisitDay()}</span>
            </div>
            <div className='priceText'>{getPriceWithFormat(getPrice())}</div>
          </div>
          {!!form?.coupon_code && !!form?.discount_amount && (
            <div className='priceItem'>
              <div className='priceLabel'>
                İndirim <span>{`(${form?.coupon_code})`}</span>
              </div>
              <div className='priceText'>{getPriceWithFormat(form?.discount_amount * -1)}</div>
            </div>
          )}

          <div className='totalPriceContainer'>
            <div className='totalPriceLabel'>TOPLAM TUTAR</div>
            <div className='totalPrice'>{getPriceWithFormat(getTotalPrice())}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
