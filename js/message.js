const TIME = 5000;

const showAlert = (message) => {
  const divError = document.querySelector('.error_div_get');
  divError.textContent = message;
  divError.classList.remove('visually-hidden');
  setTimeout(() => {
    divError.classList.add('visually-hidden');
  }, TIME);
};

const showStatus = (status) => {
  const messageTemplateElement = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const Fragment = document.createDocumentFragment();
  const Elem = messageTemplateElement.cloneNode(true);

  Fragment.appendChild(Elem);
  document.body.append(Fragment);

  setTimeout(() => {
    const messageDiv = document.body.querySelector(`.${status}`);
    document.body.removeChild(messageDiv);
  }, TIME);
};

export { showAlert, showStatus };
