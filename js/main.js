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

const randomInteger = (min, max) =>
  Math.round(min - 0.5 + Math.random() * (max - min + 1));

const getRandomNumber = (firstNumder, secondNumder) => {
  if (firstNumder < 0 || secondNumder < 0) {
    return NaN;
  }
  if (firstNumder > secondNumder) {
    return randomInteger(secondNumder, firstNumder);
  } else {
    return randomInteger(firstNumder, secondNumder);
  }
};
const getrandonElementArray = (array) =>
  array[getRandomNumber(0, array.length - 1)];

const randomFloat = (min, max, digits) =>
  (Math.random() * (max - min) + min).toFixed(digits);

const getRandomFloat = (firstNumder, secondNumder, num) => {
  if (firstNumder < 0 || secondNumder < 0) {
    return NaN;
  }
  if (firstNumder > secondNumder) {
    return randomFloat(secondNumder, firstNumder, num);
  } else {
    return randomFloat(firstNumder, secondNumder, num);
  }
};

const getRandomArrayLength = (arr) => {
  const newArr = [];
  const arrayLength = getRandomNumber(1, arr.length);
  for (let i = 0; i < arrayLength; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

const zeroLeadingSubstitute = (num) => num.toString().padStart(2, '0');

function createAdvert(id) {
  const location = {
    lat: randomFloat(
      COORDINATES.MIN_LAT,
      COORDINATES.MAX_LAT,
      COORDINATES.COUNT_OF_DECIMALS
    ),
    lng: randomFloat(
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

getRandomNumber(20, 60);
getRandomFloat(20, 60, 2);
const createArrayOfObjects = () =>
  Array.from({ length: COUNT_OBJECTS }, (_, index) => createAdvert(index + 1));

createArrayOfObjects();
