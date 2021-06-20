import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './footer';

const Room = props => {
  const detail = useSelector(state => state?.data?.detail);
  const form = useSelector(state => state?.data?.form);

  const setForm = (key, event) => {
    props?.setFormData({ [key]: event?.target?.value });
  };

  return (
    <div>
      <Footer
        backButtonClick={() => props?.backStage()}
        nextButtonClick={() => props?.nextStage()}
      />
    </div>
  );
};

export default Room;
