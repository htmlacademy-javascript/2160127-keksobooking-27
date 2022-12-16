import { showAlert } from './alert-message.js';
//import { renderObject } from './data.js';

const URL_SERVER = 'https://27.javascript.pages.academy/keksobooking1';
const URL_DATA = `${URL_SERVER}/data`;

const getData = (onSuccess) => {
  fetch(URL_DATA)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(showAlert('Ошибка загрузки данных с сервера'));
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(URL_SERVER, {
      method: 'POST',
      body
    });
    if (!response.ok) {
      throw new Error('Не удалось отправить форму.Попробуйте еще раз');
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export { getData, sendData };
