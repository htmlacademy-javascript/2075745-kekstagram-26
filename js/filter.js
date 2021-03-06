import { findElement, getShuffleArray } from './utils.js';

// ? что сломалось. Предыдущие картинки не удаляются с экрана
// Количество картинок для загрузки
//? Ну, вообще-то надо брать столько картинок, сколько даст сервер.
// Смотреть техзадание, может там указано: вывести только 25
const COUNT_PICTURES = 25;
// Количество картинок для фильтра "10 случайных"
const COUNT_RANDOM_PICTURES = 10;

export const filterSection = findElement(document, '.img-filters');
let activeFilter = findElement(filterSection, '.img-filters__button--active');

// Для фильтра: по убыванию количество комментариев
export const compareCommentsLength = (img1, img2) => img2.comments.length - img1.comments.length;

// Выбор фильтра
export const setActiveFilterClick = (callback) => {
  filterSection.addEventListener('click', (evt) => {
    if (evt.target.nodeName === 'BUTTON') {
      const CLASS_ACTIVE_FILTER = 'img-filters__button--active';
      if (!evt.target.classList.contains(CLASS_ACTIVE_FILTER)) {
        activeFilter.classList.remove(CLASS_ACTIVE_FILTER);
        evt.target.classList.add(CLASS_ACTIVE_FILTER);
        activeFilter = findElement(document, `.${CLASS_ACTIVE_FILTER}`);
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

