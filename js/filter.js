import { findElement, getShuffleArray, onElementClick } from './utils.js';
import { COUNT_PICTURES, COUNT_RANDOM_PICTURES, CLASS_ACTIVE_FILTER } from './const.js';

export const filterSection = findElement(document, '.img-filters');
let activeFilter = findElement(filterSection, '.img-filters__button--active');

// Для фильтра: по убыванию количество комментариев
export const compareCommentsLength = (img1, img2) => img2.comments.length - img1.comments.length;

// Выбор фильтра
export const setActiveFilterClick = (callback) => {
  onElementClick(filterSection, (evt) => {
    if (evt.target.nodeName === 'BUTTON') {
      if (!evt.target.classList.contains(CLASS_ACTIVE_FILTER)) {
        activeFilter.classList.remove(CLASS_ACTIVE_FILTER);
        evt.target.classList.add(CLASS_ACTIVE_FILTER);
        activeFilter = findElement(filterSection, `.${CLASS_ACTIVE_FILTER}`);
      }
      callback();
    }
  });
};

// Получить массив картинок
export const getFilteredArray = (array) => {
  const arrayDefault = array.slice();
  let arrayFiltered;
  switch (activeFilter.id) {
    case 'filter-default':
      arrayFiltered = arrayDefault;
      break;
    case 'filter-random':
      arrayFiltered = getShuffleArray(arrayDefault)
        .slice(0, COUNT_RANDOM_PICTURES);
      break;
    case 'filter-discussed':
      arrayFiltered = arrayDefault
        .sort(compareCommentsLength)
        .slice(0, COUNT_PICTURES);
      break;
  }

  return arrayFiltered;
};

