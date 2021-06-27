import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { CheckCircleIcon } from '@heroicons/react/outline';
import Summary from './summary';

const Success = props => {
  const form = useSelector(state => state?.data?.form);
  const [showModal, setShowModal] = useState(false);

  const newReserve = () => {
    props?.setForm();
    props?.setStage('selectHotel');
  };

  const removeReservation = () => {
    let url = `https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/${form?.id}`;
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, requestOptions)
      .then(() => props?.setForm())
      .then(() => props?.setStage('selectHotel'));
  };

  return (
    <>
      {!!showModal && (
        <div className='modal'>
          <div className='modalContent'>
            <div className='modalTitle'>Rezervasyonu silmek istiyor musunuz?</div>
            <div className='modalButtonContainer'>
              <button className='myButton' onClick={() => setShowModal(!showModal)}>
                Hayır
              </button>
              <button className='myButton' onClick={removeReservation}>
                Evet
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='success'>
        <div className='successContainer'>
          <div className='successIconContainer'>
            <div className='successIcon'>
              <CheckCircleIcon />
            </div>
          </div>
          <div className='successTitle'>Rezervasyon kaydınız alınmmıştır.</div>
          <div className='successDescription'>
            Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya yeni
            rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.
          </div>
          <div className='buttonsContainer'>
            <div className='buttonWrapper'>
              <button className='myButton' onClick={newReserve}>
                Yeni Rezervasyon Yap
              </button>
            </div>
            <div className='buttonWrapper'>
              <button className='myButton' onClick={() => props?.setStage('selectHotel')}>
                Rezervasyonu Güncelle
              </button>
            </div>
            <div className='buttonWrapper'>
              <button className='myButton' onClick={() => setShowModal(true)}>
                Rezervasyonu İptal Et
              </button>
            </div>
          </div>
        </div>
        <Summary {...props} />
      </div>
    </>
  );
};

export default Success;
