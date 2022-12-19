const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const fieldsets = adForm.querySelectorAll('fieldset');

const turnFilterOff = () => {
  mapFilter.classList.add('map__filter--disabled');
  for (const child of mapFilter.children) {
    child.disabled = true;
  }
};

//turnOn all filters
const turnFilterOn = () => {
  mapFilter.classList.add('map__filter--disabled');
  for (const child of mapFilter.children) {
    child.disabled = false;
  }
};

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
