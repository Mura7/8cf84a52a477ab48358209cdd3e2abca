import { setData } from '../redux/actions/dataActions';
import { connect } from 'react-redux';
import styles from '../styles/Home.module.scss';

const Index = props => {
  return (
    <div>
      Card Name: {props?.data?.card_name}
      <br />
      <button
        className={styles.code}
        onClick={() =>
          props.setData({
            hotel_id: 3,
            start_date: '2021-01-20',
            end_date: '2021-02-20',
            adult: 10,
            child: 2,
            room_type: 2,
            room_scenic: 3,
            price: 7676,
            coupon_code: 'CODE100',
            card_name: 'Ali Yılmaz',
            card_number: '1111222233334444',
            card_date_month: '01',
            card_date_year: '2030',
            card_cvv: '999'
          })
        }
      >
        Set Data
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setData: data => dispatch(setData(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
