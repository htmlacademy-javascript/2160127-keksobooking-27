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

export { turnAdFormOff, turnAdFormOn };
