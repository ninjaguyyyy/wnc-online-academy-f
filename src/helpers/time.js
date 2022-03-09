export const getFormatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const getFormatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const getDayAgo = (dateTimeString) => {
  const createdDate = Date.parse(dateTimeString);
  const now = Date.now();

  return (now - createdDate) / (24 * 1000 * 3600);
};
