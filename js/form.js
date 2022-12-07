const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const formSliders = adForm.querySelectorAll('.ad-form__slider');
const mapFilters = mapFilter.querySelectorAll('.map__filter');
const mapFieldsets = mapFilter.querySelectorAll('fieldset');

const disableForm = (form) => form.classList.add(`${form.className.split(' ')[0]}--disabled`);
const enableForm = (form) => form.classList.remove(`${form.className.split(' ')[0]}--disabled`);

const disableInteractiveElements = (elements) => {
  elements.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const enableInteractiveElements = (elements) => {
  elements.forEach((element) => element.removeAttribute('disabled', 'disabled'));
};

const activatePage = () => {
  enableForm(adForm);
  enableForm(mapFilter);
  enableInteractiveElements(fieldsets);
  enableInteractiveElements(formSliders);
  enableInteractiveElements(mapFilters);
  enableInteractiveElements(mapFieldsets);
};

const deactivatePage = () => {
  disableForm(mapFilter);
  disableForm(adForm);
  disableInteractiveElements(fieldsets);
  disableInteractiveElements(formSliders);
  disableInteractiveElements(mapFilters);
  disableInteractiveElements(mapFieldsets);
};

export { activatePage, deactivatePage };
