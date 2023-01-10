import { debounce } from './features.js';
//import { groupOfMarkers } from './map.js';
//import { createMarker, removeAllMarkers } from './map.js';
//import { turnFilter } from './stage-page.js';

const DEBOUNCE_TIME = 500;
const OFFER_COUNT = 10;
const Price = {
  MIDDLE: 10000,
  HIGH: 100000
};

const allFilters = document.querySelector('.map__filters');
const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = Array.from(document.querySelectorAll('.map__checkbox'));
const offers = [];

const clearFilter = () => allFilters.reset();

const filterByType = (offer, type) => type === 'any' || offer.offer.type === type;
const filterByPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.price < Price.MIDDLE;
    case 'middle':
      return offer.price > Price.MIDDLE && offer.price < Price.HIGH;
    case 'high':
      return offer.price >= Price.HIGH;
  }
};
const filterByRooms = (offer, rooms) => rooms === 'any' || offer.rooms === Number(rooms);
const filterByGuests = (offer, guests) => guests === 'any' || offer.guests === Number(guests);
const filterByFeatures = (offer, features) => {
  if (!features.lenght) {
    return true;
  }
  if (!offer.offer.features) {
    return false;
  }
  return features.every((feature) => offer.offer.features.includes(feature));
};

const getFilteredOffers = () => {
  const selectedType = typeFilter.value;
  const selectedPrice = priceFilter.value;
  const selectedRooms = roomsFilter.value;
  const selectedGuests = guestsFilter.value;

  const selectedFeatures = [];
  featuresFilter.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });

  const filteredOffers = [];
  for (const offer of offers) {
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
  return filteredOffers;
};

const setOnFilterChange = (cb) => {
  allFilters.addEventListener(
    'change',
    debounce(() => {
      //groupOfMarkers.clearLayers();
      cb(getFilteredOffers);
    }, DEBOUNCE_TIME)
  );
};

// const sortAdsArray = (array) => {
//   allFilters.addEventListener(
//     'change',
//     //debounce(
//     () => {
//       removeAllMarkers();
//       const filterArray = adsFiltering(array).slice(0, 10);
//       filterArray.forEach(
//         // eslint-disable-next-line no-console
//         (ad) => console.log(ad)
//         //createMarker(ad)
//       );
//     } //, 500)
//   );
// };

export { setOnFilterChange, clearFilter };
