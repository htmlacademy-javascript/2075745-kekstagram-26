import { getData } from './api.js';
import { setUserFormSubmit, blockSubmitButton, unblockSubmitButton } from './form.js';
import { getFilteredArray, setActiveFilterClick, filterSection } from './filter.js';
import { findElement, debounce, showAlert } from './utils.js';
import { DEBOUNCE_DEFAULT_DELAY } from './const.js';
import { setupAllPhotos } from './data.js';

setUserFormSubmit(blockSubmitButton, unblockSubmitButton);

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


