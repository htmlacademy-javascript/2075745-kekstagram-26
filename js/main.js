import { getData } from './api.js';
import { closeModal, setUserFormSubmit } from './form.js';
import { getFilteredArray, setActiveFilterClick, filterSection } from './filter.js';
import { debounce, DEBOUNCE_DEFAULT_DELAY, showAlert } from './utils.js';
import { createPosts } from './data.js';

setUserFormSubmit(closeModal, closeModal);

// getData(onSuccessMessage);

getData(
  (messages) => {
    createPosts(messages);
    setActiveFilterClick(debounce(
      () => createPosts(getFilteredArray(messages)),
      DEBOUNCE_DEFAULT_DELAY,
    ));
    filterSection.classList.remove('img-filters--inactive');
  },
  () => showAlert('Не удалось получить данные. Попробуйте обновить страницу')
);
