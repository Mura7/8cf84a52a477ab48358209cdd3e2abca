import { CalendarIcon, HomeIcon, CreditCardIcon } from '@heroicons/react/outline';

const Footer = ({ nextButtonClick = () => {}, backButtonClick = () => {}, showBack = true }) => {
  const myButton = (text, callback = () => {}) => {
    return (
      <div className='myButton' onClick={callback}>
        {text}
      </div>
    );
  };
  return (
    <div className={`footer ${!showBack && 'end'}`}>
      {!!showBack && myButton('Geri', backButtonClick)}
      {myButton('Kaydet ve Devam Et', nextButtonClick)}
    </div>
  );
};

export default Footer;
