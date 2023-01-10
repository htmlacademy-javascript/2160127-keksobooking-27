import { getBlockModifier } from './utils.js';

const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

const disableElementForm = (tag, form, isDisable = true) => {
  const elements = form.querySelectorAll(tag);

  for (const element of elements) {
    element.disabled = isDisable;
  }
};

// Функция, которая блокирует и разблокирует форму
const createFormSwitcher = (form, selectors = ['fieldset']) => {
  const disableClass = getBlockModifier(form, 'disabled');

  return () => {
    form.classList.toggle(disableClass);

    const isDisable = form.classList.contains(disableClass);

    selectors.forEach((cssSelector) => disableElementForm(cssSelector, form, isDisable));
  };
};

const switchFilterState = createFormSwitcher(filtersForm, ['fieldset', 'selector']);

const switchAdFormState = createFormSwitcher(adForm);

export { switchAdFormState, switchFilterState };
