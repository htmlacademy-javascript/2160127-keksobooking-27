const TIME = 5000;

const divErrorTempldate = document.querySelector('#error').content.querySelector('.error');

const errorElem = divErrorTempldate.cloneNode(true);

const errorFragment = document.createDocumentFragment();

//const divError = document.querySelector('#error');
const showAlert = (message) => {
  errorElem.textContent = message;
  //divError.classList.remove('visually-hidden');

  errorFragment.appendChild(errorElem);

  setTimeout(() => {
    errorFragment.removeChild(errorElem);
  }, TIME);
};

export { showAlert };
