import { setAdPins } from './map.js';
import { switchFilterState } from './page-states.js';
import { debounce } from './utils.js';

const RERENDER_DELAY = 1000;
const FILTER_ALL = 'any';
const Price = {
  MIDDLE: 10000,
  HIGH: 100000
};

const filterForm = document.querySelector('.map__filters');

const features = filterForm.features;

const getFiltersValue = () => ({
  type: filterForm['housing-type'].value,
  price: filterForm['housing-price'].value,
  rooms: filterForm['housing-rooms'].value,
  guests: filterForm['housing-guests'].value
});

const getCheckedFeatures = () => {
  const result = [];
  for (const feature of features) {
    if (feature.checked) {
      result.push(feature.value);
    }
  }
  return result;
};

const isFilteringByPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer < Price.MIDDLE;
    case 'middle':
      return offer > Price.MIDDLE && offer < Price.HIGH;
    case 'high':
      return offer >= Price.HIGH;
  }
};

const isFilteringByValue = (value, filterValue) => filterValue === FILTER_ALL || String(value) === String(filterValue);

const getFilterHandler = (allLocations) => () => {
  const filterValue = getFiltersValue();
  const checkedFeatures = getCheckedFeatures();

  const filteredLocations = allLocations.filter(({ offer }) => {
    if (!isFilteringByValue(offer.type, filterValue.type)) {
      return false;
    }

    if (!isFilteringByValue(offer.rooms, filterValue.rooms)) {
      return false;
    }

    if (!isFilteringByValue(offer.guests, filterValue.guests)) {
      return false;
    }

    if (!isFilteringByPrice(offer.price, filterValue.price)) {
      return false;
    }

    if (checkedFeatures.length === 0) {
      return true;
    }

    if (offer.features === undefined) {
      return true;
    }

    return checkedFeatures.every((feature) => offer.features.includes(feature));
  });

  setAdPins(filteredLocations);
};

const initFilter = (allLocations) => {
  setAdPins(allLocations);
  switchFilterState();
  const debouncedInputFilter = debounce(getFilterHandler(allLocations), RERENDER_DELAY);
  filterForm.addEventListener('input', debouncedInputFilter);
  filterForm.addEventListener('reset', debouncedInputFilter);
};

const resetFilters = () => filterForm.reset();

export { initFilter, resetFilters };
