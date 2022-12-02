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

getRandomNumber(20, 60);
getRandomFloat(20, 60, 2);
