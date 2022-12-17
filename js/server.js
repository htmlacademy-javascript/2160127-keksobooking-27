import { showAlert } from './message.js';

const URL_SERVER = 'https://27.javascript.pages.academy/keksobooking';
const URL_DATA = `${URL_SERVER}/data`;

const getData = (onSuccess) => {
  fetch(URL_DATA)
    .then((response) => response.json())
    .then(onSuccess)
    .catch((error) => showAlert(`Ошибка загрузки данных с сервера: ${error}`));
};

const sendData = async (onSuccess, onFail, body) => {
  fetch(URL_SERVER, {
    method: 'POST',
    credentials: 'same-origin',
    body: body
  })
    .then((response) => {
      response.json();
      // eslint-disable-next-line no-console
      console.log(response.ok);
    })
    .then((values) => {
      onSuccess(values);
    })
    .catch(() => {
      onFail();
    });
  //onSuccess();
};
//(error)
// eslint-disable-next-line no-console

export { getData, sendData };
