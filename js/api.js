import { showAlert } from './message.js';
/*файл для получени и отпрвки данных*/

const URL_SERVER = 'https://27.javascript.pages.academy/keksobooking';
const URL_DATA = `${URL_SERVER}/data`;

const getData = (onSuccess) => {
  fetch(URL_DATA)
    .then((response) => response.json())
    .then(onSuccess)
    .catch((error) => showAlert(`Ошибка загрузки данных с сервера: ${error}`));
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
