import { getData } from './api.js';
import { closeModal, setUserFormSubmit } from './form.js';
import { getFilteredArray, setActiveFilterClick, filterSection } from './filter.js';
import { findElement, debounce, DEBOUNCE_DEFAULT_DELAY, showAlert } from './utils.js';
// import { createPosts } from './data.js';
import { setupAllPhotos } from './data.js';

setUserFormSubmit(closeModal, closeModal);

// getData(onSuccessMessage);

getData(
  (messages) => {
    setupAllPhotos(findElement(document, '.pictures'),
      messages,
      findElement(document, '#picture'));
    setActiveFilterClick(debounce(
      () => setupAllPhotos(findElement(document, '.pictures'),
        getFilteredArray(messages),
        findElement(document, '#picture')),
      DEBOUNCE_DEFAULT_DELAY,
    ));
    filterSection.classList.remove('img-filters--inactive');
  },
  () => showAlert('Не удалось получить данные. Попробуйте обновить страницу')
);


