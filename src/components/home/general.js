import React, { useState, useEffect } from 'react';
import { setDetail } from '../../../redux/actions/dataActions';
import { useSelector, useDispatch } from 'react-redux';
import { SearchIcon } from '@heroicons/react/outline';
import Footer from './footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import { format } from 'date-fns';
registerLocale('tr', tr);
setDefaultLocale('tr');

const General = props => {
  const detail = useSelector(state => state?.data?.detail);
  const form = useSelector(state => state?.data?.form);
  const [hotels, setHotels] = useState([]);
  const [validation, setValidation] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fectData();
  }, []);

  useEffect(() => {
    if (!!form?.hotel_id) getHotelDetail(form?.hotel_id);
  }, [hotels]);

  const fectData = async () => {
    const res = await fetch('https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels');
    const data = await res.json();
    setHotels(data);
  };

  const getHotelDetail = async id => {
    const res = await fetch('https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details');
    const data = await res.json();
    const detail = data.filter(e => +e?.hotel_id === +id);
    const hotel = hotels.filter(e => +e?.id === +id);
    if (!hotel?.length) return null;
    dispatch(setDetail({ ...detail[0], hotel_name: hotel[0].hotel_name }));
  };

  const selectHotel = event => {
    setForm('hotel_id', event);
    const id = event?.target?.value;
    getHotelDetail(id);
  };

  const setForm = (key, value) => {
    props?.setFormData({ [key]: value });
  };

  const selectOptions = (key = 'adult') => {
    const options = [];
    const maxValue = key === 'adult' && detail?.max_adult_size ? detail?.max_adult_size : 6;
    for (let i = 0; i < maxValue; i++) {
      options.push(
        <option key={key + i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  };

  const nextStage = () => {
    if (
      !form?.hotel_id ||
      !form?.start_date ||
      !form?.end_date ||
      !form?.adult ||
      +form?.adult === 0
    ) {
      return setValidation(true);
    }
    props?.nextStage();
  };

  const getDateValue = (key = 'start') => {
    if (key === 'start') {
      if (form?.start_date) {
        return new Date(form?.start_date);
      }
    } else if (form?.end_date) {
      return new Date(form?.end_date);
    }
    return new Date();
  };

  return (
    <div>
      <div className='generalContainer'>
        <div className='searchContainer'>
          <div className='searchIcon'>
            <SearchIcon />
          </div>
          <select
            onChange={event => selectHotel(event?.target?.value)}
            className='selectOtel'
            name='hotels'
            id='hotels'
            value={form?.hotel_id}
          >
            <option value=''>Rezervasyon yapmak istediğiniz oteli seçiniz.</option>
            {hotels?.map(({ id, hotel_name }, index) => {
              return (
                <option key={'otel' + index} value={id}>
                  {hotel_name}
                </option>
              );
            })}
          </select>
        </div>
        {validation && !form?.hotel_id && <div className='validation'>Zorunlu Alan</div>}
        <div className='formContainer'>
          <div className='formItem'>
            <div className='label'>Giriş Tarihi</div>
            <DatePicker
              locale='tr'
              dateFormat='PPP'
              selected={getDateValue()}
              onChange={date => setForm('start_date', format(date, 'yyyy-MM-dd'))}
            />
            {validation && !form?.start_date && <div className='validation'>Zorunlu Alan</div>}
          </div>
          <div className='formItem'>
            <div className='label'>Çıkış Tarihi</div>
            <DatePicker
              locale='tr'
              dateFormat='PPP'
              selected={getDateValue('end')}
              onChange={date => setForm('end_date', format(date, 'yyyy-MM-dd'))}
            />
            {validation && !form?.end_date && <div className='validation'>Zorunlu Alan</div>}
          </div>
          <div className='formItem'>
            <div className='label'>Yetişkin Sayısı</div>
            <select
              onChange={event => setForm('adult', event?.target?.value)}
              name='adult'
              id='adult'
              value={form?.adult}
            >
              {selectOptions()}
            </select>
            {validation && (+form?.adult === 0 || !form?.adult) && (
              <div className='validation'>Zorunlu Alan</div>
            )}
          </div>
          <div className='formItem'>
            <div className='label'>Çoçuk Sayısı</div>
            <select
              onChange={event => setForm('child', event?.target?.value)}
              name='child'
              id='child'
              disabled={!detail?.child_status}
              value={form?.child}
            >
              {selectOptions('child')}
            </select>
            {!detail?.child_status && (
              <div className='warning'>Çoçuk ziyaretçi kabul edilmiyor!</div>
            )}
          </div>
        </div>
      </div>
      <Footer showBack={false} nextButtonClick={() => nextStage()} />
    </div>
  );
};

export default General;
