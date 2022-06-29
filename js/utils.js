
export { getRandom, checkLength }

function getRandom(min, max) {
  min = Math.round(Math.abs(+min));
  max = Math.round(Math.abs(+max));
  [min, max] = max < min ? [max, min] : [min, max];
  if (!(min && max)) { return false; };
  console.log(`Min ${min}; Max ${max}`);
  return Math.round(Math.random() * (max - min) + min);
}

let checkLength = (anyString, maxLength) => (anyString.length <= maxLength);

function getRandomBooking(min, max, numberOfPoints) {
  const rank = Math.pow(10, numberOfPoints);
  min = Math.round(Math.abs(+min) * rank);
  max = Math.round(Math.abs(+max) * rank);
  [min, max] = max < min ? [max, min] : [min, max];
  if (!(min && max)) { return false; };
  console.log(`Min ${min / rank}; Max ${max / rank}`);
  return Math.round(Math.random() * (max - min) + min) / rank;
}

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

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
