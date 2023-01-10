//import { debounce } from './features.js';
import { removeAllMarkers } from './map.js';
//import { createMarker, removeAllMarkers } from './map.js';

const allFilters = document.querySelector('.map__filters');
const typeFilter = document.querySelector('#housing-type');
// const priceFilter = document.querySelector('#housing-price');
// const roomsFilter = document.querySelector('#housing-rooms');
// const guestsFilter = document.querySelector('#housing-guests');
// const featuresFilter = Array.from(document.querySelectorAll('.map__checkbox:checked'));

const adsFiltering = (array) => {
  // eslint-disable-next-line no-console
  console.log(array);
  const filter = array.filter((ad) => {
    const type = ad.offer.type === typeFilter.value || typeFilter.value === 'any';
    return type;
  });
  return filter;
};

const sortAdsArray = (array) => {
  allFilters.addEventListener(
    'change',
    //debounce(
    () => {
      removeAllMarkers();
      const filterArray = adsFiltering(array).slice(0, 10);
      filterArray.forEach(
        // eslint-disable-next-line no-console
        (ad) => console.log(ad)
        //createMarker(ad)
      );
    } //, 500)
  );
};

export { sortAdsArray };
