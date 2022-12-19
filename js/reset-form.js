import { resetMarker } from './map.js';
import { adFormTitle, adFormType, adFormPrice, adFormTimeIn, adFormTimeOut, adFormRooms, adFormCapacity } from './form.js';

const resetButton = document.querySelector('.ad-form__reset');
const description = document.querySelector('#description');

const resetForm = () => {
  resetMarker();
  adFormTitle.value = '';
  adFormPrice.value = '';
  adFormType.options[1].selected = true;
  adFormTimeIn.options[1].selected = true;
  adFormTimeOut.options[0].selected = true;
  adFormRooms.options[0].selected = true;
  adFormCapacity.options[0].selected = true;
  description.value = '';
};

const resetButttonForm = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
};
resetForm();
export { resetButttonForm, resetForm };
