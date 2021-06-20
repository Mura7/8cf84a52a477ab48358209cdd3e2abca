import React, { useState, useEffect } from 'react';
import { setDetail } from '../../../redux/actions/dataActions';
import { useSelector, useDispatch } from 'react-redux';
import { SearchIcon } from '@heroicons/react/outline';
import Footer from './footer';

const curr = new Date();
const nowDate = curr.toISOString().substr(0, 10);

const General = props => {
  const detail = useSelector(state => state?.data?.detail);
  const form = useSelector(state => state?.data?.form);
  const [hotels, setHotels] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fectData();
  }, []);

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

    dispatch(setDetail({ ...detail[0], hotel_name: hotel[0].hotel_name }));
  };

  const selectHotel = event => {
    setForm('hotel_id', event);
    const id = event?.target?.value;
    getHotelDetail(id);
  };

  const setForm = (key, event) => {
    props?.setFormData({ [key]: event?.target?.value });
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

  return (
    <div>
      <div className='generalContainer'>
        <div className='searchContainer'>
          <div className='searchIcon'>
            <SearchIcon />
          </div>
          <select
            onChange={event => selectHotel(event)}
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
        <div className='formContainer'>
          <div className='formItem'>
            <div className='label'>Giriş Tarihi</div>
            <input
              type='date'
              id='start_date'
              name='start_date'
              value={form?.start_date}
              defaultValue={nowDate}
              onChange={event => setForm('start_date', event)}
            ></input>
          </div>
          <div className='formItem'>
            <div className='label'>Çıkış Tarihi</div>
            <input
              type='date'
              id='end_date'
              name='end_date'
              value={form?.end_date}
              defaultValue={nowDate}
              onChange={event => setForm('end_date', event)}
            ></input>
          </div>
          <div className='formItem'>
            <div className='label'>Yetişkin Sayısı</div>
            <select
              onChange={event => setForm('adult', event)}
              name='adult'
              id='adult'
              value={form?.adult || 1}
            >
              {selectOptions()}
            </select>
          </div>
          <div className='formItem'>
            <div className='label'>Çoçuk Sayısı</div>
            <select
              onChange={event => setForm('child', event)}
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
      <Footer showBack={false} nextButtonClick={() => props?.nextStage('selectRoom')} />
    </div>
  );
};

export default General;
