import { sendData } from './api.js';
import { showError, showSuccess } from './message.js';
import { turnAdFormOff, turnAdFormOn } from './stage-page.js';
//import { resetForm } from './reset-form.js';

const MAX_PRICE = 100000;
const ROOM_OPTIONS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};
const ERROR_ROOMS = 'Количество комнат не соответсвует количеству гостей';
const TYPE_OPTION = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};
const ERROR_CAPACITY = 'Такое количество гостей не соответсвует количеству комнат';
const ERROR_TIME_IN = 'Время заезда должно быть равно времени выезда';
const ERROR_TIME_OUT = 'Время выезда должно быть равно времени заезда';

const adForm = document.querySelector('.ad-form');
const adFormTitle = adForm.querySelector('#title');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');
const slider = adForm.querySelector('.ad-form__slider');
const adFormRooms = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');

const validateTitle = (value) => value.length >= 30 && value.length <= 100;
const validatePrice = () => adFormPrice.value <= MAX_PRICE;
const validateCapacity = () => ROOM_OPTIONS[adFormRooms.value].includes(adFormCapacity.value);

const onTimeChange = (time, timeChange) => {
  time.value = timeChange.value;
};
const validateTimeIn = () => {
  adFormTimeOut.addEventListener('change', onTimeChange(adFormTimeOut, adFormTimeIn));

  return adFormTimeOut.value === adFormTimeIn.value;
};

const validateTimeOut = () => {
  adFormTimeIn.addEventListener('change', onTimeChange(adFormTimeIn, adFormTimeOut));

  return adFormTimeIn.value === adFormTimeOut.value;
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
});

const onTypeChange = () => {
  adFormPrice.placeholder = TYPE_OPTION[adFormType.value];
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: MAX_PRICE
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (cost) {
      return cost.toFixed(0);
    },
    from: function (cost) {
      return parseFloat(cost);
    }
  }
});

slider.noUiSlider.on('change', () => {
  adFormPrice.value = slider.noUiSlider.get();
  pristine.validate(adFormPrice);
});

adFormPrice.addEventListener('input', () => {
  if (!adFormPrice.value) {
    slider.noUiSlider.set(0);
  }
  slider.noUiSlider.set(adFormPrice.value);
});

const resetSlider = () => slider.noUiSlider.set(0);

adFormType.addEventListener('change', onTypeChange);

const validateType = () => parseInt(adFormPrice.value, 10) >= parseInt(TYPE_OPTION[adFormType.value], 10);

const validateTypeDescription = () => `Сумма должна быть выше ${TYPE_OPTION[adFormType.value]}`;

pristine.addValidator(adFormTitle, validateTitle);

pristine.addValidator(adFormPrice, validatePrice);

pristine.addValidator(adFormRooms, validateCapacity, ERROR_ROOMS);

pristine.addValidator(adFormCapacity, validateCapacity, ERROR_CAPACITY);
pristine.addValidator(adFormPrice, validateType, validateTypeDescription);

pristine.addValidator(adFormTimeIn, validateTimeIn, ERROR_TIME_IN);

pristine.addValidator(adFormTimeOut, validateTimeOut, ERROR_TIME_OUT);

const adFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    const isValid = pristine.validate();
    if (isValid) {
      turnAdFormOff();
      //resetForm();
      sendData(showSuccess, showError, formData);
      turnAdFormOn();
    }
  });
};

export { adFormSubmit, resetSlider };
