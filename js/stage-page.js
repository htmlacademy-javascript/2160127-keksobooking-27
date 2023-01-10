const TURN_STATUS = {
  Off: true,
  On: false
};
const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const fieldsets = adForm.querySelectorAll('fieldset');

const turnFilter = (status) => {
  mapFilter.classList.add('map__filter--disabled');
  for (const child of mapFilter.children) {
    child.disabled = status;
  }
};

//turnOn all filters
// const turnFilterOn = () => {
//   mapFilter.classList.add('map__filter--disabled');
//   for (const child of mapFilter.children) {
//     child.disabled = false;
//   }
// };

const turnAdFormOff = () => {
  adForm.classList.add('ad-form--disabled');
  fieldsets.forEach((children) => {
    children.disabled = true;
  });
  turnFilter(TURN_STATUS.Off);
};

const turnAdFormOn = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsets.forEach((children) => {
    children.disabled = false;
  });
  turnFilter(TURN_STATUS.On);
};

export { turnAdFormOff, turnAdFormOn, turnFilter };
