import { resetMarker, closePopup } from './map.js';
import { resetSlider } from './form-validate.js';
import { resetPhotoFields } from './photo.js';
import { clearFilter } from './filters.js';

const adForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');

const resetForm = () => {
  adForm.reset();
  closePopup();
  resetMarker();
  resetSlider();
  resetPhotoFields();
  clearFilter();
};

const resetButttonForm = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
};
resetForm();
export { resetButttonForm, resetForm };
