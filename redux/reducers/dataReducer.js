import { SET_DATA, SET_DETAIL, SET_FORM } from '../actions/dataActions';

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action?.payload };
    case SET_DETAIL:
      return { ...state, detail: action?.payload };
    case SET_FORM:
      return { ...state, form: action?.payload };
    default:
      return { ...state };
  }
};

export default dataReducer;
