import React, { useState } from 'react';

const Coupon = props => {
  const [coupon, setCoupon] = useState('');
  const [validation, setValidation] = useState('');

  const useCoupon = async () => {
    if (!coupon) {
      return setValidation('Lütfen Kodu Giriniz');
    }
    const data = await getCoupon();
    if (!data?.length) return setValidation('Kod Bulunmuyor');

    const expiration_at = data[0]?.expiration_at;
    const date = new Date(expiration_at);
    var today = new Date();

    if (today >= date) {
      return setValidation('Kodunuzun Süresi Dolmuş');
    } else {
      setForm(data);
    }
  };

  const getCoupon = async () => {
    const res = await fetch(
      `https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons?code=${coupon}`
    );
    const data = await res.json();
    return data;
  };

  const setForm = data => {
    const formData = {
      coupon_code: data[0]?.code,
      discount_amount: data[0]?.discount_ammount
    };

    props.setFormData(formData);
    alert('Tebrikler indiriminiz uygulandı');
  };

  const onChange = event => {
    setValidation('');
    setCoupon(event?.target?.value);
  };

  return (
    <div className='couponCodeContainer'>
      <div className='couponInputContainer'>
        <div className='formItem'>
          <input
            id='coupon'
            name='coupon'
            value={coupon}
            placeholder='Kupon Kodu'
            onChange={event => onChange(event)}
          />
          {validation && <div className='validation'>{validation}</div>}
        </div>
      </div>
      <div>
        <button className='myButton' onClick={useCoupon}>
          Kodu Kullan
        </button>
      </div>
    </div>
  );
};

export default Coupon;
