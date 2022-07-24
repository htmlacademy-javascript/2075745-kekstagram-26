import { ALERT_SHOW_TIME, DEBOUNCE_DEFAULT_DELAY } from './const.js';

const checkInteger = (number) => {
  if (!Number.isInteger(number)) {
    throw new Error(`Число ${number} не integer, не целое`);
  }
};

const checkPositive = (number) => {
  if (number < 0) {
    throw new Error(`Число ${number} отрицательное`);
  }
};
const checkMinMax = (left, right) => {
  if (left >= right) {
    throw new Error('Левый параметр не меньше правого');
  }
};

const checkValidation = (min, max) => {
  checkInteger(min);
  checkInteger(max);
  checkPositive(min);
  checkMinMax(min, max);
};

export const getRandomPositiveInteger = (min, max) => {
  checkValidation(min, max);
  return Math.round(Math.random() * (max - min) + min);
};

export const getRandomAvatar = (length) => `img/avatar-${getRandomPositiveInteger(1, length)}.svg`;

export const findElement = (container, selector) => {
  if (container === null) {
    return null;
  }
  return container.querySelector(selector);
};

export const onElementClick = (element, fn) => {
  if (element === null) {
    return null;
  }
  element.addEventListener('click', fn);
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const isEnterKey = (evt) => evt.key === 'Enter';

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export const debounce = (callback, timeoutDelay = DEBOUNCE_DEFAULT_DELAY) => {
  let timeout;

  return (...rest) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Перемешиваем массив
export const getShuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomPositiveInteger(0, i);
    const swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }

  return array;
};
