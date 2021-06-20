import { SET_DATA } from '../actions/dataActions';

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, ...action?.payload };
    default:
      return { ...state };
  }
};

export default dataReducer;
