import { CalendarIcon, HomeIcon, CreditCardIcon } from '@heroicons/react/outline';

const Stages = ({ stage = '' }) => {
  return (
    <div className='stageContainer'>
      <div className='stageItemsContainer'>
        <div className='stageItem'>
          <div className='iconWrapper'>
            <CalendarIcon className={`icon ${stage === 'general' ? 'active' : ''}`} />
          </div>
          <div className={`stageText ${stage === 'general' ? 'active' : ''}`}>
            Otel ve Tarih Seçimi
          </div>
        </div>

        <div className='stageItem'>
          <div className='iconWrapper'>
            <HomeIcon className={`icon ${stage === 'room' ? 'active' : ''}`} />
          </div>
          <div className={`stageText ${stage === 'room' ? 'active' : ''}`}>
            Oda Tipi ve Manzara Seçimi
          </div>
        </div>

        <div className='stageItem'>
          <div className='iconWrapper'>
            <CreditCardIcon className={`icon ${stage === 'payment' ? 'active' : ''}`} />
          </div>
          <div className={`stageText ${stage === 'payment' ? 'active' : ''}`}>
            Önizleme ve Ödeme İşlemleri
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stages;
