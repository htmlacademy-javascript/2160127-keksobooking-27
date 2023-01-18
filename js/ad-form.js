import { showError, showSuccess } from './modal.js';
import { resetFilters } from './filter.js';
import { sendData } from './api.js';

const MAX_SYMBOLS_VALUE = 100;
const MIN_SYMBOLS_VALUE = 30;
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

const PRISTINE_OPTIONS = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
};
const ERROR_CAPACITY = 'Такое количество гостей не соответсвует количеству комнат';
const ERROR_TIME_IN = 'Время заезда должно быть равно времени выезда';
const ERROR_TIME_OUT = 'Время выезда должно быть равно времени заезда';

const adForm = document.querySelector('.ad-form');
const adFormButton = adForm.querySelector('.ad-form__submit');
const adFormTitle = adForm.querySelector('#title');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');
const slider = adForm.querySelector('.ad-form__slider');
const adFormRooms = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormAddress = adForm.querySelector('#address');

const setCoordinates = (location) => {
  adFormAddress.setAttribute('value', `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`);
};

const validateTitle = (value) => value.length >= MIN_SYMBOLS_VALUE && value.length <= MAX_SYMBOLS_VALUE;
const validatePrice = () => adFormPrice.value <= MAX_PRICE;
const validateCapacity = () => ROOM_OPTIONS[adFormRooms.value].includes(adFormCapacity.value);

const onChangeTime = (time, timeChange) => {
  time.value = timeChange.value;
};
const validateTimeIn = () => {
  adFormTimeOut.addEventListener('change', onChangeTime(adFormTimeOut, adFormTimeIn));

  return adFormTimeOut.value === adFormTimeIn.value;
};

const validateTimeOut = () => {
  adFormTimeIn.addEventListener('change', onChangeTime(adFormTimeIn, adFormTimeOut));

  return adFormTimeIn.value === adFormTimeOut.value;
};

const pristine = new Pristine(adForm, PRISTINE_OPTIONS);

const onChangeType = () => {
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

const onChangePrice = () => {
  if (!adFormPrice.value) {
    slider.noUiSlider.set(0);
  }
  slider.noUiSlider.set(adFormPrice.value);
};

adFormPrice.addEventListener('input', onChangePrice);

adFormType.addEventListener('change', onChangeType);

const validateType = () => parseInt(adFormPrice.value, 10) >= parseInt(TYPE_OPTION[adFormType.value], 10);

const validateTypeDescription = () => `Сумма должна быть выше ${TYPE_OPTION[adFormType.value]}`;

pristine.addValidator(adFormTitle, validateTitle);

pristine.addValidator(adFormPrice, validatePrice);

pristine.addValidator(adFormRooms, validateCapacity, ERROR_ROOMS);

pristine.addValidator(adFormCapacity, validateCapacity, ERROR_CAPACITY);
pristine.addValidator(adFormPrice, validateType, validateTypeDescription);

pristine.addValidator(adFormTimeIn, validateTimeIn, ERROR_TIME_IN);

pristine.addValidator(adFormTimeOut, validateTimeOut, ERROR_TIME_OUT);

const blockSubmitButton = () => {
  adFormButton.classList.add('map__filters--disabled');
  adFormButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  adFormButton.classList.remove('map__filters--disabled');
  adFormButton.textContent = 'Опубликовать';
};

const onSuccess = () => {
  showSuccess();
  adForm.reset();
  resetFilters();
};

adForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    adFormTimeIn.removeEventListener('change', onChangeTime(adFormTimeIn, adFormTimeOut));
    adFormTimeOut.removeEventListener('change', onChangeTime(adFormTimeOut, adFormTimeIn));
    adFormType.removeEventListener('change', onChangeType);
    adFormPrice.removeEventListener('input', onChangePrice);
    await sendData(onSuccess, showError, new FormData(adForm));
    unblockSubmitButton();
  }
});

export { setCoordinates, adForm, slider };
