import { findElement, getShuffleArray } from './utils.js';

const COUNT_PICTURES = 25;
const COUNT_RANDOM_PICTURES = 10;

export const filterSection = findElement(document, '.img-filters');
let activeFilter = findElement(filterSection, '.img-filters__button--active');

//?
export const compareCommentsLength = (img1, img2) => img2.comments.length - img1.comments.length;

export const setActiveFilterClick = (callback) => {
  filterSection.addEventListener('click', (evt) => {
    if (evt.target.nodeName === 'BUTTON') {
      // const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
      if (!evt.target.classList.contains('img-filters__button--active')) {
        activeFilter.classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
        activeFilter = findElement(document, '.img-filters__button--active');
      }

      callback();
    }
  });
};

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

