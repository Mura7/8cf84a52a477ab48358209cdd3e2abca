import React, { useState, useEffect } from 'react';
import { setForm, resetForm } from '../redux/actions/dataActions';
import { connect } from 'react-redux';
import Head from 'next/head';
import Layout from '../src/components/app/layout';
import Stages from '../src/components/home/stages';
import General from '../src/components/home/general';
import Room from '../src/components/home/room';
import Payment from '../src/components/home/payment';
import Success from '../src/components/home/success';

const Index = props => {
  const [stage, setStage] = useState('selectHotel');

  useEffect(() => {
    const formData = localStorage.getItem('formData');
    const data = JSON.parse(formData);
    if (data) {
      setFormData(data);
    }
  }, []);

  const setFormData = data => {
    const form = { ...props?.form_data, ...data };
    localStorage.setItem('formData', JSON.stringify(form));
    props?.setForm(form);
  };

  const renderStages = () => {
    switch (stage) {
      case 'selectHotel':
        return <General setFormData={setFormData} nextStage={() => setStage('selectRoom')} />;
      case 'selectRoom':
        return (
          <Room
            setFormData={setFormData}
            backStage={() => setStage('selectHotel')}
            nextStage={() => setStage('payment')}
          />
        );
      case 'payment':
        return (
          <Payment
            setFormData={setFormData}
            backStage={() => setStage('selectRoom')}
            nextStage={() => setStage('success')}
          />
        );
      case 'success':
        return <Success setFormData={setFormData} setForm={() => props?.setForm()} setStage={setStage} />;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Otel</title>
        <meta name='description' content='Otel Rezervasyon Sistemi' />
      </Head>
      <div>
        {stage !== 'success' && <Stages stage={stage} />}
        {renderStages()}
      </div>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    form_data: state?.data?.form
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setForm: data => dispatch(setForm(data)),
    resetForm: () => dispatch(resetForm())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
