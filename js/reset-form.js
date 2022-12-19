import { resetMarker } from './map.js';
import { resetSlider } from './form.js';

const adForm = document.querySelector('.ad-form');
const adFormTitle = adForm.querySelector('#title');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');
const adFormRooms = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');

const resetButton = document.querySelector('.ad-form__reset');
const description = document.querySelector('#description');

const resetForm = () => {
  resetMarker();
  resetSlider();
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
