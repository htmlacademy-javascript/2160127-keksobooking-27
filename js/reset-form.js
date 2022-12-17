import { resetMarker } from './map.js';
import { adFormTitle, adFormType, adFormPrice, adFormTimeIn, adFormTimeOut, adFormRooms, adFormCapacity } from './form.js';

const resetButton = document.querySelector('.ad-form__reset');
const description = document.querySelector('#description');

const resetForm = () => {
  resetButton.addEventListener('click', (event) => {
    event.preventDefault();
    resetMarker();
    adFormTitle.value = '';
    adFormPrice.value = '';
    adFormType.options[1].selected = true;
    adFormTimeIn.options[1].selected = true;
    adFormTimeOut.options[0].selected = true;
    adFormRooms.options[0].selected = true;
    adFormCapacity.options[0].selected = true;
    description.value = '';
  });
};
resetForm();
export { resetForm };
