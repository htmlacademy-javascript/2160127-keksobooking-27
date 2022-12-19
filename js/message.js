import { resetForm } from './reset-form.js';
import { isEscapeKey } from './utils.js';
const TIME = 5000;
const successElement = document.querySelector('#success').content.querySelector('.success');
const errorElement = document.querySelector('#error').content.querySelector('.error');

const showAlert = (message) => {
  const divError = document.querySelector('.error_div_get');
  divError.textContent = message;
  divError.classList.remove('visually-hidden');
  setTimeout(() => {
    divError.classList.add('visually-hidden');
  }, TIME);
};
const cloneSuccessElement = successElement.cloneNode(true);
const cloneErrorElement = errorElement.cloneNode(true);
const onSuccessKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cloneSuccessElement.remove();
  }
};
const onErrorKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cloneErrorElement.remove();
  }
};

const showSuccess = () => {
  resetForm();
  document.addEventListener('keydown', onSuccessKeydown);

  document.body.appendChild(
    cloneSuccessElement,
    setTimeout(() => {
      cloneSuccessElement.remove();
      document.removeEventListener('keydown', onSuccessKeydown);
      document.removeEventListener('click', onSuccessKeydown);
    }, TIME)
  );
};

const showError = () => {
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorKeydown);
  document.body.appendChild(cloneErrorElement);
};

export { showAlert, showError, showSuccess };
