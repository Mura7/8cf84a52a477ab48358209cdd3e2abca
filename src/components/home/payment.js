import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from './footer';
import Summary from './summary';

const Payment = props => {
  const form = useSelector(state => state?.data?.form);
  const [validation, setValidation] = useState(false);

  const setForm = (key, event) => {
    props?.setFormData({ [key]: event?.target?.value });
  };

  const getOptions = (key = 'month') => {
    const options = [];
    const maxValue = key === 'month' ? 12 : 2032;
    const minValue = key === 'month' ? 1 : 2021;
    for (let i = minValue; i <= maxValue; i++) {
      const value = i < 10 ? '0' + i : i;
      options.push(
        <option key={key + i} value={value}>
          {value}
        </option>
      );
    }

    return options;
  };

  const nextStage = () => {
    if (
      !form?.card_number ||
      !form?.card_name ||
      !form?.card_date_month ||
      !form?.card_date_year ||
      !form?.card_cvv
    ) {
      return setValidation(true);
    }

    const data = JSON.stringify(form);

    let url = 'https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings';
    let method = 'POST';
    if (!!form.id) {
      url += `/${form.id}`;
      method = 'PUT';
    }
    const requestOptions = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: data
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => props?.setFormData(data))
      .then(() => props?.nextStage());
  };

  return (
    <div>
      <div className='paymentContent'>
        <div className='cardContainer'>
          <div className='cardWrapper'>
            <div className='cardTitle'>Credit Card</div>
            <div className='cardNumber'>
              {form?.card_number?.replace(/\b(\d{4})(\d{4})(\d{4})(\d{4})\b/, '$1 $2 $3 $4') ||
                'XXXX XXXX XXXX XXXX'}
            </div>
            <div className='cardName'>{form?.card_name || 'Ad Soyad'}</div>
            <div className='cardDate'>{`${form?.card_date_month || ''}/${
              form?.card_date_year || ''
            }`}</div>
          </div>
          <div className='formContainer'>
            <div className='formTitle'>Kredi Kartı Bilgileri</div>
            <div className='formItem'>
              <div className='label'>Kartın Üzerindeki İsim</div>
              <input
                id='card_name'
                name='card_name'
                value={form?.card_name}
                onChange={event => setForm('card_name', event)}
              />
              {!form?.card_name && validation && <div className='validation'>Zorunlu Alan</div>}
            </div>
            <div className='formItem'>
              <div className='label'>Kartın Numarası</div>
              <input
                id='card_number'
                name='card_number'
                value={form?.card_number}
                onChange={event => setForm('card_number', event)}
                maxLength={16}
              />
              {!form?.card_number && validation && <div className='validation'>Zorunlu Alan</div>}
            </div>
            <div className='row'>
              <div>
                <div className='label'>Kart Son Kullanma Tarihi</div>
                <div className='dateContainer'>
                  <div className='formItem'>
                    <select
                      onChange={event => setForm('card_date_month', event)}
                      name='card_date_month'
                      id='card_date_month'
                      value={form?.card_date_month}
                    >
                      {getOptions()}
                    </select>
                    {!form?.card_date_month && validation && (
                      <div className='validation'>Zorunlu Alan</div>
                    )}
                  </div>
                  <div className='formItem'>
                    <select
                      onChange={event => setForm('card_date_year', event)}
                      name='card_date_year'
                      id='card_date_year'
                      value={form?.card_date_year}
                    >
                      {getOptions('year')}
                    </select>
                    {!form?.card_date_year && validation && (
                      <div className='validation'>Zorunlu Alan</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='formItem'>
                <div className='label'>CVV</div>
                <input
                  id='card_cvv'
                  name='card_cvv'
                  value={form?.card_cvv}
                  maxLength={3}
                  onChange={event => setForm('card_cvv', event)}
                />
                {!form?.card_cvv && validation && <div className='validation'>Zorunlu Alan</div>}
              </div>
            </div>
          </div>
        </div>
        <div className='summaryPart'>
          <Summary {...props} show_coupon={true} />
        </div>
      </div>
      <Footer backButtonClick={() => props?.backStage()} nextButtonClick={nextStage} />
    </div>
  );
};

export default Payment;
