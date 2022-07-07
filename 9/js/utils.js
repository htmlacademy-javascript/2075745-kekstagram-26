function checkInteger(number) {
  if (!Number.isInteger(number)) {

    throw new Error(`Число ${number} не integer, не целое`);
  }
}

function checkPositive(number) {
  if (number < 0) {
    throw new Error(`Число ${number} отрицательное`);
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
  checkMinMax(min, max);
}

export function getRandomPositiveInteger(min, max) {
  checkValidation(min, max);
  return Math.round(Math.random() * (max - min) + min);
}

export const checkLength = (anyString, maxLength) => (anyString.length <= maxLength);

export const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

export const getRandomMessage = (elements) =>
  getRandomPositiveInteger(0, 1) ? elements[getRandomPositiveInteger(0, elements.length - 1)] : elements[getRandomPositiveInteger(0, elements.length - 1)] + elements[getRandomPositiveInteger(0, elements.length - 1)];

export const getRandomPhoto = function (length) {
  return `photos/${getRandomPositiveInteger(1, length)}.jpg`;
};

export const getRandomAvatar = function (length) {
  return `img/avatar-${getRandomPositiveInteger(1, length)}.svg`;
};


const setCss = (htmlElement, className) => {
  if (htmlElement === null) {
    return;
  }
  htmlElement.classList.add(className);
};
export const findElement = (container, selector) => {
  if (container === null) {
    return null;
  }
  return container.querySelector(selector);
};

export const displayElementAdd = (container, selector, className) => {
  setCss(findElement(container, selector), className);
};

export const createCounter = (start = 0, step = 1) => {
  let counter = start;
  return (
    {
      inc: () => {
        const result = counter;
        counter += step;
        return result;
      },
      dec: () => {
        const result = counter;
        counter -= step;
        return result;
      },
      value: () => counter,
    });

};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const isEnterKey = (evt) => evt.key === 'Enter';
