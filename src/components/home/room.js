import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from './footer';
import ImageRadio from '../app/imageRadio';

const Room = props => {
  const detail = useSelector(state => state?.data?.detail);
  const form = useSelector(state => state?.data?.form);

  const [validation, setValidation] = useState(false);

  const setForm = (key, value) => {
    props?.setFormData({ [key]: value });
  };

  const nextStage = () => {
    if (!form?.room_scenic || !form?.room_type) {
      return setValidation(true);
    }
    props?.nextStage();
  };

  return (
    <div>
      <div className='roomContainer'>
        <div className='hotelName'>
          {detail?.hotel_name}
          <span className='city'>({detail?.city})</span>
        </div>
        <div className='detail'>
          <span className='label'>Giriş Tarihi: </span>
          <span className='text'>{form?.start_date}</span>
          <span className='label'>Çıkış Tarihi: -</span>
          <span className='text'>{form?.end_date}</span>
          <span className='label'>Yetişkin: -</span>
          <span className='text'>{form?.adult}</span>
          <span className='label'>Çoçuk: -</span>
          <span className='text'>{form?.child || 0}</span>
        </div>
      </div>
      <ImageRadio
        data={detail?.room_type}
        title='Oda Tipi Seçimi'
        selectedValue={form?.room_type}
        onSelect={val => setForm('room_type', val)}
        formData={form}
        validation={!form?.room_type && validation}
      />
      <ImageRadio
        data={detail?.room_scenic}
        title='Manzara Seçimi'
        selectedValue={form?.room_scenic}
        onSelect={val => setForm('room_scenic', val)}
        validation={!form?.room_scenic && validation}
      />
      <Footer backButtonClick={() => props?.backStage()} nextButtonClick={() => nextStage()} />
    </div>
  );
};

export default Room;
