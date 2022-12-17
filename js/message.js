const TIME = 5000;
const successElement = document.querySelector('#success').content.querySelector('.success');
const errorElement = document.querySelector('#error').content.querySelector('.error');

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const divError = document.querySelector('.error_div_get');
  divError.textContent = message;
  divError.classList.remove('visually-hidden');
  setTimeout(() => {
    divError.classList.add('visually-hidden');
  }, TIME);
};

const showSuccess = () => {
  const cloneSuccessElement = successElement.cloneNode(true);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      cloneSuccessElement.remove();
    }
  });
  document.addEventListener('click', () => {
    cloneSuccessElement.remove();
  });

  document.body.appendChild(
    cloneSuccessElement,
    setTimeout(() => cloneSuccessElement.remove(), TIME)
  );
};

const showError = () => {
  const cloneErrorElement = errorElement.cloneNode(true);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      cloneErrorElement.remove();
    }
  });

  document.addEventListener('click', () => {
    cloneErrorElement.remove();
  });

  document.body.appendChild(cloneErrorElement);
};

export { showAlert, showError, showSuccess };
