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
  newArr.sort(() => Math.random() - 0.5);
  return newArr;
};

const zeroLeadingSubstitute = (num) => num.toString().padStart(2, '0');

export {
  getRandomFloat,
  zeroLeadingSubstitute,
  getrandonElementArray,
  getRandomNumber,
  getRandomArrayLength
};
