//Action Types
export const SET_DATA = 'SET_DATA';
export const SET_DETAIL = 'SET_DETAIL';
export const SET_FORM = 'SET_FORM';

//Action Creator
export const setData = payload => ({
  type: SET_DATA,
  payload
});

export const setDetail = payload => ({
  type: SET_DETAIL,
  payload
});


export const setForm = payload => ({
  type: SET_FORM,
  payload
});
