import {
  getRandomFloat,
  zeroLeadingSubstitute,
  getrandonElementArray,
  getRandomNumber,
  getRandomArrayLength
} from './util.js';

const COUNT_OBJECTS = 10;

const DESCRIPTIONS = [
  'Отличный вид из окна',
  'С видом на озеро',
  'Тихий район',
  'Рядом парк',
  'Не далеко кинотеатр',
  'Отличное место'
];
const TITLES = [
  'Нельзя пройти мимо',
  'Супердом',
  'Фантастично',
  'Мы не предлагаем того, чего не купили бы сами',
  'Легко доехать',
  'Для привередливой семьи',
  'Дайте вашей семье лучшее',
  'Отличные соседи, отличная цена',
  'Адрес, который вы будете называть с гордостью'
];
const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const LIST_FIATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const COORDINATES = {
  MIN_LAT: 35.65,
  MAX_LAT: 35.7,
  MIN_LNG: 139.7,
  MAX_LNG: 139.8,
  COUNT_OF_DECIMALS: 5
};

function createAdvert(id) {
  const location = {
    lat: getRandomFloat(
      COORDINATES.MIN_LAT,
      COORDINATES.MAX_LAT,
      COORDINATES.COUNT_OF_DECIMALS
    ),
    lng: getRandomFloat(
      COORDINATES.MIN_LNG,
      COORDINATES.MAX_LNG,
      COORDINATES.COUNT_OF_DECIMALS
    )
  };

  return {
    author: {
      avatar: `img/avatars/user${zeroLeadingSubstitute(id)}.png`
    },
    offer: {
      title: getrandonElementArray(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(1000, 25000),
      type: getrandonElementArray(APARTMENT_TYPES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 5),
      checkin: getrandonElementArray(TIMES),
      checkout: getrandonElementArray(TIMES),
      features: getRandomArrayLength(LIST_FIATURES),
      description: getrandonElementArray(DESCRIPTIONS)
    },
    location: location
  };
}

const createArrayOfObjects = () =>
  Array.from({ length: COUNT_OBJECTS }, (_, index) => createAdvert(index + 1));

export { createArrayOfObjects };
