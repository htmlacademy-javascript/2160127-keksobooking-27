import { setAdPins } from './map.js';
import { switchFilterState } from './page-states.js';
import { debounce } from './utils.js';

const OFFER_COUNT = 10;
const RERENDER_DELAY = 1000;
const Price = {
  MIDDLE: 10000,
  HIGH: 50000
};

const allFilters = document.querySelector('.map__filters');
const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
//const featuresFilter = Array.from(document.querySelectorAll('.map__checkbox'));

const filterByType = (offer, type) => type === 'any' || offer.offer.type === type;
const filterByPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < Price.MIDDLE;
    case 'middle':
      return offer.offer.price > Price.MIDDLE && offer.offer.price < Price.HIGH;
    case 'high':
      return offer.offer.price >= Price.HIGH;
  }
};
const filterByRooms = (offer, rooms) => rooms === 'any' || offer.offer.rooms === Number(rooms);

const filterByGuests = (offer, guests) => guests === 'any' || offer.offer.guests === Number(guests);

const filterByFeatures = (offer, features) => {
  // eslint-disable-next-line no-console
  console.log(offer.offer.features);
  if (!features.lenght) {
    return true;
  }
  features.every((feature) => offer.offer.features.includes(feature));
};

const getFilterHandler = (offers) => () => {
  const selectedType = typeFilter.value;
  const selectedPrice = priceFilter.value;
  const selectedRooms = roomsFilter.value;
  const selectedGuests = guestsFilter.value;

  const featuresFilter = Array.from(document.querySelectorAll('.map__checkbox'));
  const selectedFeatures = [];
  featuresFilter.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });

  const filteredOffers = [];
  for (const offer of offers) {
    // eslint-disable-next-line no-console
    console.log(offer);
    if (filteredOffers.length >= OFFER_COUNT) {
      break;
    }
    if (
      filterByType(offer, selectedType) &&
      filterByPrice(offer, selectedPrice) &&
      filterByRooms(offer, selectedRooms) &&
      filterByGuests(offer, selectedGuests) &&
      filterByFeatures(offer, selectedFeatures)
    ) {
      filteredOffers.push(offer);
    }
  }

  setAdPins(filteredOffers);
};

const initFilter = (allLocations) => {
  // eslint-disable-next-line no-console
  //console.log(allLocations);
  setAdPins(allLocations);
  switchFilterState();
  const debouncedInputFilter = debounce(getFilterHandler(allLocations), RERENDER_DELAY);
  allFilters.addEventListener('input', debouncedInputFilter);
  allFilters.addEventListener('reset', debouncedInputFilter);
};

const resetFilters = () => allFilters.reset();

export { initFilter, resetFilters };
