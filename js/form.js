import { turnFilterOff, turnFilterOn } from './filter.js';

const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');

const adFormTitle = adForm.querySelector('#title');

const adFormPrice = adForm.querySelector('#price');
const MAX_PRICE = 100000;

const adFormRooms = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');

const roomsOption = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const adFormType = adForm.querySelector('#type');
const typeOption = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');

const slider = adForm.querySelector('.ad-form__slider');

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

const validateTitle = (value) => value.length >= 30 && value.length <= 100;
const validatePrice = () => adFormPrice.value <= MAX_PRICE;
const validateCapacity = () => roomsOption[adFormRooms.value].includes(adFormCapacity.value);

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
  adFormPrice.placeholder = typeOption[adFormType.value];
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

adFormType.addEventListener('change', onTypeChange);

const validateType = () => adFormPrice.value >= typeOption[adFormType.value];

const validateTypeDescription = () => `Сумма должна быть выше ${typeOption[adFormType.value]}`;

pristine.addValidator(adFormTitle, validateTitle);

pristine.addValidator(adFormPrice, validatePrice);

pristine.addValidator(adFormRooms, validateCapacity, 'Количество комнат не соответсвует количеству гостей');

pristine.addValidator(adFormCapacity, validateCapacity, 'Такое количество гостей не соответсвует количеству комнат');
pristine.addValidator(adFormPrice, validateType, validateTypeDescription);

pristine.addValidator(adFormTimeIn, validateTimeIn, 'Время заезда должно быть равно времени выезда');

pristine.addValidator(adFormTimeOut, validateTimeOut, 'Время выезда должно быть равно времени заезда');

const adFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      turnAdFormOff();
      setTimeout(() => {
        turnAdFormOn();
      }, 5000);
    }
  });
};

export { turnAdFormOff, turnAdFormOn, adFormSubmit };
