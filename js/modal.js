import { isEscapeKey } from './utils.js';

const HIDE_DELAY = 5000;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const initModal = (template, extraCloser) => {
  const element = template.cloneNode(true);

  document.body.append(element);
  document.body.style.overflow = 'hidden';
  document.body.style.overflow = 'auto';

  const removeModal = () => {
    element.remove();
  };

  const keydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      element.remove();
      document.removeEventListener('keydown', keydownHandler);
    }
  };

  document.addEventListener('click', removeModal);
  document.addEventListener('keydown', keydownHandler);

  if (extraCloser) {
    const closer = element.querySelector(extraCloser);
    closer.addEventListener('click', removeModal);
  }

  setTimeout(removeModal, HIDE_DELAY);
};

const showSuccess = () => initModal(successTemplate);
const showError = () => initModal(errorTemplate, '.error__button');

export { showSuccess, showError };
