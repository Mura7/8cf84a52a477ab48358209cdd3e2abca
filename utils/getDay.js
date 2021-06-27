const parseDate = str => {
  const mdy = str?.split('-');
  if (!mdy?.length) return 0;
  return new Date(mdy[0], mdy[1] - 1, mdy[2]);
};

const datediff = (first, second) => {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
};

const getDay = (start_date, end_date) => {
  return datediff(parseDate(start_date), parseDate(end_date));
};

export default getDay;
