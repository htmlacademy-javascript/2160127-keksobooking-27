const TIME = 5000;

const showAlert = (status) => {
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

export { showAlert };
