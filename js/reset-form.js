import { resetMarker, closePopup } from './map.js';
import { resetSlider } from './form.js';

const adForm = document.querySelector('.ad-form');

const resetButton = document.querySelector('.ad-form__reset');

const resetForm = () => {
  closePopup();
  resetMarker();
  resetSlider();
  adForm.resetForm();
};

const resetButttonForm = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
};
resetForm();
export { resetButttonForm, resetForm };
