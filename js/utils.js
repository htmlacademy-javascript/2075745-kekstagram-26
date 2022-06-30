function checkInteger(number) {
  if (!isInteger(number)) {
    throw new Error('Число ${number} не integer, не целое');
  }
}

function checkPositive(number) {
  if (number < 0) {
    throw new Error('Число ${number} отрицательное');
  }
}
function checkMinMax(left, right) {
  if (left >= right) {
    throw new Error('Левый параметр не меньше правого');
  }
}

function checkValidation(min, max) {
  checkInteger(min);
  checkInteger(max);
  checkPositive(min);
  checkPositive(max); // можно и не проверять, потому что есть проверка checkMinMax
  checkMinMax(min, max);
}



export function getRandom(min, max) {
  checkValidation(min, max);
  return Math.round(Math.random() * (max - min + 1) + min);
}

export let checkLength = (anyString, maxLength) => (anyString.length <= maxLength);

const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};

const getRandomMessage = (elements) => {
  return getRandomPositiveInteger(0, 1) ? elements[getRandomPositiveInteger(0, elements.length - 1)] : elements[getRandomPositiveInteger(0, elements.length - 1)] + elements[getRandomPositiveInteger(0, elements.length - 1)]
};

const getRandomAvatar = (length) => {
  return 'img/avatar-' + getRandomPositiveInteger(1, length) + '.svg';
};

const getRandomNotRepeatInteger = () => {
  // Зачем что-то мудрить? Надо просто найти максимальный и сделать инкриментацию
  let lastNumbers = [];
  const MAXINTEGER = 1000;
  MAXINTEGER += (MAXINTEGER >= lastNumbers.length);
  let newNumber;
  do {
    newNumber = getRandomPositiveInteger(1, MAXINTEGER);
  }
  while (!lastNumbers.some(element => element === newNumber));
  lastNumbers.push(newNumber);
  return newNumber;
}


