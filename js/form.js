import { turnFilterOff, turnFilterOn } from './filter.js';

const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');

const turnAdFormOff = () => {
  adForm.classList.add('ad-form--disabled');
  fieldsets.forEach((children) => {
    children.disabled = true;
  });
  turnFilterOff();
};

const turnAdFormOn = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsets.forEach((children) => {
    children.disabled = false;
  });
  turnFilterOn();
};

const pristine = new Pristine(adForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text__error-text'
});

const adFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      console.log('isValid');
    } else {
      console.log('!isValid');
    }
  });
};

export { turnAdFormOff, turnAdFormOn, adFormSubmit };
