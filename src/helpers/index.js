import { BASE_URL } from "./constants";

export const generateURLGetImageResource = (imageName) => BASE_URL.PRO + "resources/image/" + imageName;

export const getFormatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const getFormatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
