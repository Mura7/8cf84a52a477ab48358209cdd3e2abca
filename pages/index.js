import React, { useState, useEffect } from 'react';
import { setForm } from '../redux/actions/dataActions';
import { connect } from 'react-redux';
import Head from 'next/head';
import Layout from '../src/components/app/layout';
import Stages from '../src/components/home/stages';
import General from '../src/components/home/general';
import Room from '../src/components/home/room';
import Payment from '../src/components/home/payment';

const Index = props => {
  const [stage, setStage] = useState('selectHotel');
  
  const setFormData = data => {
    const form = { ...props?.form_data, ...data };
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
    }
  };

  return (
    <Layout>
      <Head>
        <title>Otel</title>
        <meta name='description' content='Otel Rezervasyon Sistemi' />
      </Head>
      <div>
        <Stages stage={stage} />
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
    setForm: data => dispatch(setForm(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
